#!/usr/bin/env bash
set -e

# db:prepare is idempotent: creates the database if missing, loads schema
# (or runs pending migrations if the schema is already loaded).
echo "Setting up database..."
bundle exec rails db:prepare

exec "$@"
