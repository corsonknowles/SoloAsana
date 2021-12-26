# frozen_string_literal: true

class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :body
      t.integer :due
      t.boolean :done
      t.references :user, index: true
      t.references :project, index: true
      t.references :team, index: true
      t.boolean :section
      t.references :task, index: true

      t.timestamps
    end
  end
end
