class Api::V1::AnswersController < ApplicationController
  # ※before_actionのauthenticate_api_v1_user!をset_answerの前に持ってこないとset_answerで500エラーが出るため注意※
  before_action :authenticate_api_v1_user!, only: [:index, :show, :create, :update, :destroy]
  before_action :set_answer, only: [:update, :destroy]

  # 特定のユーザーに紐づけられている回答を全て返す
  def index
    @answers = Answer.includes(:questions).where(user_id: current_api_v1_user.id)
    render json: {
      answers: @answers
    }, status: :ok
  end

  def show
    @answer = current_api_v1_user.answers.includes(:questions).find(params[:id])
    render json: {
      answer: @answer
    }, status: :ok
  end

  def create
    answer = Answer.new(answer_params)
    answer.user_id = current_api_v1_user.id
    if answer.save
      render json: {
        answer:
      }, status: :created
    else
      render json: {
        errors: answer.errors
      }, status: :unprocessable_entity
    end
  end

  def update
    if @answer.update(answer_params)
      render json: {
        answer: @answer
      }, status: :ok
    else
      render json: {
        errors: @answer.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @answer.destroy
      render json: {
        answer: @answer
      }, status: :ok
    else
      render json: {
        errors: @answer.errors
      }, status: :unprocessable_entity
    end
  end

  private

  # current_api_v1_user.answersとすることで本人のみの回答にアクセス権を与える
  def set_answer
    @answer = current_api_v1_user.answers.find(params[:id])
  end

  def answer_params
    params.require(:answer).permit(:question_id, :title, :content)
  end
end
