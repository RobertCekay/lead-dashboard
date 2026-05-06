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

  test "create persists a decision and returns it" do
    assert_difference("Decision.count", 1) do
      post decisions_url, params: {
        decision: {
          title: "Adopt SimpleCov",
          context: "We had no coverage visibility",
          decision: "Add SimpleCov to the test suite",
          tradeoffs: "Slightly slower test runs"
        }
      }
    end

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal "Adopt SimpleCov", body["title"]
  end

  test "create returns 400 when required params are missing" do
    assert_no_difference("Decision.count") do
      post decisions_url, params: {}
    end
    assert_response :bad_request
  end

  test "update modifies an existing decision and returns it" do
    decision = decisions(:one)

    patch decision_url(decision), params: {
      decision: { tradeoffs: "Reconsidered after onboarding pain" }
    }

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal "Reconsidered after onboarding pain", body["tradeoffs"]
    assert_equal "Reconsidered after onboarding pain", decision.reload.tradeoffs
  end
end
