# frozen_string_literal: true

class User < ActiveRecord::Base
  #モデルでurl_forメソッドを使用するためのヘルパーをinclude
  include Rails.application.routes.url_helpers

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  include DeviseTokenAuth::Concerns::User

  # ActiveStorage用(imageとするとエラーが発生するためavatarとしておく)
  has_one_attached :avatar

  # avatarのURLを返すメソッド
  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
