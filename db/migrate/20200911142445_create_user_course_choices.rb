class CreateUserCourseChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :user_course_choices do |t|
      t.belongs_to :user 
      t.belongs_to :course

      t.timestamps
      t.index [ :user_id, :course_id ], name: "index_user_course_uniqueness", unique: true

    end
  end
end
