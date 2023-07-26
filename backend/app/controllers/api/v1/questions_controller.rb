class Api::V1::QuestionsController < ApplicationController
  # ※before_actionのauthenticate_api_v1_user!をset_questionの前に持ってこないとset_questionで500エラーが出るため注意※
  before_action :authenticate_api_v1_user!, only: [:create, :update, :destroy]
  before_action :set_question, only: [:update, :destroy]

  # ユーザーidを渡されるかどうかで返す値を変更
  # 紐づいているuserデータも含める
  def index
    if params[:user_id].present?
      @questions = Question.includes(:user).where(user_id: params[:user_id])
    else
      @questions = Question.includes(:user).all
    end
  end

  # 紐づいているuserデータと、全ての回答も返す
  def show
    @question = Question.includes(:answers, :user).find(params[:id])
  end

  def create
    question = Question.new(question_params)
    question.user_id = current_api_v1_user.id
    if question.save
      render json: {
        question:
      }, status: :created
    else
      render json: {
        errors: question.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @question.update(question_params)
      render json: {
        question: @question
      }, status: :ok
    else
      render json: {
        errors: @question.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @question.destroy
      render json: {
        question: @question
      }, status: :ok
    else
      render json: {
        errors: @question.errors
      }, status: :unprocessable_entity
    end
  end

  private

  # current_api_v1_user.questionsとすることで本人のみの質問にアクセス権を与える
  def set_question
    @question = current_api_v1_user.questions.find(params[:id])
  end

  def question_params
    params.require(:question).permit(:content)
  end
end
