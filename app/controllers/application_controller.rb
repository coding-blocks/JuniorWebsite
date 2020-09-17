class ApplicationController < ActionController::Base

	before_action :ameoba_junior_student_domain

	def ameoba_junior_student_domain
		gon.push({
		    :ameoba_junior_student_domain => 'https://online-api.codingblocks.com/api/v2',
		})
	end
end
