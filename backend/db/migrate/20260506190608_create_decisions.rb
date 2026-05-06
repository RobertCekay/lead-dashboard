class CreateDecisions < ActiveRecord::Migration[8.1]
  def change
    create_table :decisions do |t|
      t.string :title
      t.text :context
      t.text :decision
      t.text :tradeoffs

      t.timestamps
    end
  end
end
