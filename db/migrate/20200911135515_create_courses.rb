class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string  :name
      t.text    :description
      t.string  :code
      t.decimal :fee, precision: 8, scale: 2

      t.timestamps
    end
  end
end
