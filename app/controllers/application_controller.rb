class ApplicationController < ActionController::Base

	before_action :set_cb_online_api_domain

	def set_cb_online_api_domain
		gon.push({
		    :online_cb_api => Rails.application.credentials.dig(:cb_online_api, :domain)
		})
	end
end
