# frozen_string_literal: true

class User < ApplicationRecord
  # モデルでurl_forメソッドを使用するためのヘルパーをinclude
  include Rails.application.routes.url_helpers

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable, :confirmable
  include DeviseTokenAuth::Concerns::User

  # ActiveStorage用(imageとするとエラーが発生するためavatarとしておく)
  has_one_attached :avatar
  has_many :favorites, dependent: :destroy
  has_many :foods, through: :favorites

  has_many :reviews
  has_many :questions
  has_many :answers

  # ニックネームに追加のバリデーション
  validates :nickname, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 50 }

  # avatarのURLを返すメソッド
  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
