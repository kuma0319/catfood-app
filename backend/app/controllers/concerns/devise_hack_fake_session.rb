# ActionDispatch::Request::Session::DisabledSessionErrorの対策にこのファイルを用意
# 参考URL: https://github.com/heartcombo/devise/issues/5443

module DeviseHackFakeSession
  extend ActiveSupport::Concern

  class FakeSession < Hash
    def enabled?
      false
    end

    def destroy; end
  end

  included do
    before_action :set_fake_session

    private

    def set_fake_session
      request.env['rack.session'] ||= ::DeviseHackFakeSession::FakeSession.new if Rails.configuration.respond_to?(:api_only) && Rails.configuration.api_only
    end
  end
end
