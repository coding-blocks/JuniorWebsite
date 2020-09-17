# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'yaml'

puts "[db:seed] loading courses yaml"
courses = YAML::load_file "db/default/courses.yml"
counter = 0
Course.create!(courses) do |course|
	puts "Create Course #{counter +=1} with name: #{course.name}"
end




