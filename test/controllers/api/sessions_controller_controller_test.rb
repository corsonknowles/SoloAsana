require 'test_helper'

class Api::SessionsControllerControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_sessions_controller_create_url
    assert_response :success
  end

  test "should get destroy" do
    get api_sessions_controller_destroy_url
    assert_response :success
  end

end
