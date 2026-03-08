# frozen_string_literal: true

# tasks.done and tasks.section were created without null: false or a default,
# giving PostgreSQL a three-valued type (true / false / NULL).
# The seed file and factory both always supply false, so no backfill is needed
# for development or test data.  The fourth argument to change_column_null acts
# as a DB-level safety net that coerces any residual NULLs before the
# constraint is applied, avoiding a separate update_all pass.
class FixTaskBooleanNullability < ActiveRecord::Migration[8.0]
  def change
    change_column_null    :tasks, :done,    false, false
    change_column_null    :tasks, :section, false, false
    change_column_default :tasks, :done,    from: nil, to: false
    change_column_default :tasks, :section, from: nil, to: false
  end
end
