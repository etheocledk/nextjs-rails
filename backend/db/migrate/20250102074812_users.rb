class Users < ActiveRecord::Migration[8.0]
  def change
    create_table :users, id: :uuid do |t| 
      t.string :fullname
      t.string :email, null: false

      t.timestamps
    end
  end
end


