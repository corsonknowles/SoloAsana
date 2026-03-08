# frozen_string_literal: true

SimpleCov.at_exit do
  # process simplecov ruby report
  SimpleCov.result.format!

  # process istanbul js report (only when COVERAGE set and we have data)
  system("npm run coverage") if ENV["COVERAGE"] && Dir.glob(File.join(Dir.pwd, ".nyc_output", "js-*.json")).any?
end

SimpleCov.start "rails" do
  enable_coverage :branch
end
