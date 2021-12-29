# frozen_string_literal: true

SimpleCov.at_exit do
  # process simplecov ruby report
  # this is the default if no `at_exit` block is configured
  SimpleCov.result.format!

  # process istanbul js report
  system("npm run coverage")
end

SimpleCov.start "rails" do
  add_filter "app/channels/application_cable"
  add_filter "app/mailers/application_mailer.rb"
end
