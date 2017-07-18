class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :body
      t.integer :due
      t.boolean :done
      t.references :user, foreign_key: true, index: true
      t.references :project, foreign_key: true, index: true
      t.references :team, foreign_key: true, index: true
      t.boolean :section
      t.references :task, foreign_key: true, index: true

      t.timestamps
    end
  end
end
