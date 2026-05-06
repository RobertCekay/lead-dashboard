class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.integer :estimate_hours
      t.string :risk_level
      t.string :status

      t.timestamps
    end
  end
end
