class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string   :username
      t.string   :first_name
      t.string   :last_name
      t.string   :email
      t.integer  :phone_number, limit: 8
      t.integer  :oneauth_id

      t.timestamps
    end
  end
end
