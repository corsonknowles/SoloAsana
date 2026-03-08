# frozen_string_literal: true

SimpleCov.at_exit do
  # process simplecov ruby report
  SimpleCov.result.format!

  # process istanbul js report and enforce 100% (only when COVERAGE set and we have data)
  if ENV["COVERAGE"] && Dir.glob(File.join(Dir.pwd, ".nyc_output", "js-*.json")).any?
    exit 1 unless system("npm run coverage")
  end
end

SimpleCov.start "rails" do
  enable_coverage :branch
  minimum_coverage line: 100, branch: 100
end
