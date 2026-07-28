# frozen_string_literal: true

SimpleCov.at_exit do
  # process simplecov ruby report
  # this is the default if no `at_exit` block is configured
  SimpleCov.result.format!

  # process javascript coverage report (only if not in CI where it's run separately)
  system("npm run test:coverage") unless ENV["CI"]
end

SimpleCov.start "rails"
