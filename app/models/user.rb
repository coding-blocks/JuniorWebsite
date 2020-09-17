class User < ApplicationRecord

	has_many :user_course_choices
	has_many :courses, through: :user_course_choices

  	validates_presence_of :oneauth_id
end
