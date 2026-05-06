require "test_helper"

class DecisionsControllerTest < ActionDispatch::IntegrationTest
  test "index returns all decisions as JSON" do
    get decisions_url
    assert_response :success
    assert_equal "application/json", response.media_type

    body = JSON.parse(response.body)
    assert_equal Decision.count, body.length

    titles = body.map { |d| d["title"] }
    assert_includes titles, decisions(:one).title
    assert_includes titles, decisions(:two).title
  end
end
