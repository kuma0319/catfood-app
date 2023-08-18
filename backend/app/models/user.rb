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
  has_one_attached :avatar, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :foods, through: :favorites

  has_many :reviews, dependent: :destroy
  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy

  # ニックネームに追加のバリデーション
  validates :nickname, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 50 }

  # avatarのURLを返すメソッド
  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end

  # ゲストログイン機能用のクラスメソッド
  def self.guest
    # ゲストユーザーが存在しない場合、ゲストユーザーを作成(ゲストユーザーを削除されたとしても，ゲスト機能が動作しなくなる問題を回避)
    find_or_create_by!(email: "guest@example.com") do |user|
      user.password = SecureRandom.urlsafe_base64
      user.nickname = "ゲストユーザー"
      user.confirmed_at = Time.now # Confirmable を使用している場合は必要
    end
  end
end
