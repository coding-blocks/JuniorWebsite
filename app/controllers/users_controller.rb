class UsersController < ApplicationController

	skip_before_action :verify_authenticity_token, only: [:add_course_choice]

	def add
	end

	def show
	end

	def course_choice
		@courses = Course.all
	end

	def details
		unless params[:oneauth_id]
			render json: {error: 'paramaters incomplete'}, status: :unprocessable_entity and return
		end

		user = User.find_by(oneauth_id: params[:oneauth_id]) 
		if user.present? 
			user_course_choices = user.courses
			render json: {user: user, course_choices: user_course_choices},status: :ok
		else
			render json: {error: 'User not present in database'}, status: :unprocessable_entity 
		end
	end

	def add_course_choice
		
		unless params[:user] && params[:preferred_courses]
			render json: {error: 'paramaters incomplete'}, status: :unprocessable_entity and return
		end

		begin
			user = User.find_by(oneauth_id: params[:user][:oneauth_id])
			user = User.create(user_params) unless user.present?

			course_choices = Array.new 

			params[:preferred_courses].each do |id|
				course_choice = Hash.new 
				course_choice[:user_id] = user.id
				course_choice[:course_id] = id

				course_choices << course_choice
			end
			user_course_choices = UserCourseChoice.import course_choices, on_duplicate_key_ignore: true
			render json: user_course_choices, status: :ok
		rescue
			render json: {error: 'error adding user course choices'}, status: :unprocessable_entity

		end

	end

	private 

	def user_params
		params[:username] = params[:user][:username]
		params[:first_name] = params[:user][:firstname]
		params[:last_name] = params[:user][:lastname]
		params[:oneauth_id] = params[:user][:oneauth_id]
		params[:email] = params[:user][:email]
		params[:phone_number] = params[:user][:phone_number]

		params.permit(:first_name, :last_name, :username, :email, :phone_number, :oneauth_id)
	end
end