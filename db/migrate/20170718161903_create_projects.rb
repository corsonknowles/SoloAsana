class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.references :team, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
