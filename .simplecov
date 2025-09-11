# frozen_string_literal: true

SimpleCov.at_exit do
  # process simplecov ruby report
  # this is the default if no `at_exit` block is configured
  SimpleCov.result.format!

  # process javascript coverage report
  system("npm run test:coverage")
end

SimpleCov.start "rails"
