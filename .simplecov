# frozen_string_literal: true

SimpleCov.at_exit do
  # process istanbul js report
  system("npm run coverage")

  # process simplecov ruby report
  # this is the default if no `at_exit` block is configured
  SimpleCov.result.format!
end

SimpleCov.start "rails"
