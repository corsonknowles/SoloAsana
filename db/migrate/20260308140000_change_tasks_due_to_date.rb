# frozen_string_literal: true

class ChangeTasksDueToDate < ActiveRecord::Migration[8.1]
  def up
    # Convert integer (Unix timestamp) to date; NULL stays NULL
    execute <<-SQL.squish
      ALTER TABLE tasks ALTER COLUMN due TYPE date USING (
        CASE WHEN due IS NOT NULL AND due > 86400
        THEN ('epoch'::timestamp + due * interval '1 second')::date
        ELSE NULL END
      )
    SQL
  end

  def down
    change_column :tasks, :due, :integer, using: "EXTRACT(epoch FROM due)::integer"
  end
end
