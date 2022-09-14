# frozen_string_literal: true

source "https://rubygems.org"

gem "autoprefixer-rails"
gem "bcrypt" # Use ActiveModel has_secure_password
gem "figaro"
gem "jbuilder" # https://github.com/rails/jbuilder
gem "jquery-rails"
gem "newrelic_rpm", "~> 8.1" # Heroku dyno monitor
gem "pg" # Use postgresql as the database for Active Record
gem "puma" # Use Puma as the app server
gem "rails"
gem "sass-rails" # Use SCSS for stylesheets

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'

group :development, :test do
  gem "ar_after_transaction"
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "capybara" # for System Tests
  gem "factory_bot"
  gem "factory_bot_rails"
  gem "faker"
  gem "rspec"
  gem "rspec-rails"
  gem "rubocop", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rspec", require: false
  # gem "selenium-webdriver"
  gem "shoulda-matchers"
  gem "simplecov", require: false
  gem "standard"
  gem 'webdrivers'
  # gem 'therubyracer', platforms: :ruby # See https://github.com/rails/execjs#readme
end

group :development do
  gem "annotate"
  gem "better_errors" # Access an IRB console on exception pages or by using <%= console %>
  gem "binding_of_caller"
  gem "listen"
  gem "pry-rails"
  gem "rails_real_favicon"
  gem "spring" # https://github.com/rails/spring
  gem "spring-watcher-listen"
  gem "web-console", ">= 3.3.0"
end
