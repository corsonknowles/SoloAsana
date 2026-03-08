# frozen_string_literal: true

# Headless Chrome driver — works in two modes:
#
#   Local (default):
#     Selenium Manager auto-downloads the matching chromedriver.
#     If macOS Gatekeeper blocks it: xattr -d com.apple.quarantine $(which chromedriver)
#
#   Docker (when SELENIUM_REMOTE_URL is set):
#     Points at the selenium/standalone-chrome service in docker-compose.
#     Capybara binds on 0.0.0.0 so the Chrome container can reach it.

SELENIUM_REMOTE_URL = ENV["SELENIUM_REMOTE_URL"]

# When running in Docker the Rails test server must be reachable from the
# Chrome container.  Fix the port so we can reference it by name.
if SELENIUM_REMOTE_URL
  Capybara.server_host = "0.0.0.0"
  Capybara.server_port = 3001
  Capybara.app_host    = "http://test:#{Capybara.server_port}"
end

Capybara.register_driver :selenium_chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument("--headless=new")
  options.add_argument("--disable-gpu")
  options.add_argument("--no-sandbox")
  options.add_argument("--disable-dev-shm-usage")
  options.add_argument("--window-size=1400,1400")

  if SELENIUM_REMOTE_URL
    Capybara::Selenium::Driver.new(
      app,
      browser: :remote,
      url: SELENIUM_REMOTE_URL,
      options: options
    )
  else
    Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
  end
end

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :selenium_chrome_headless
  end
end
