require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  test "index returns all tasks as JSON" do
    get tasks_url
    assert_response :success
    assert_equal "application/json", response.media_type

    body = JSON.parse(response.body)
    assert_equal Task.count, body.length
  end

  test "create persists a task and returns it" do
    assert_difference("Task.count", 1) do
      post tasks_url, params: {
        task: {
          title: "Write tests",
          description: "Cover the controllers",
          estimate_hours: 2,
          risk_level: "low",
          status: "open"
        }
      }
    end

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal "Write tests", body["title"]
    assert_equal 2, body["estimate_hours"]
    assert_equal "open", body["status"]
  end

  test "create returns 400 when required params are missing" do
    assert_no_difference("Task.count") do
      post tasks_url, params: {}
    end
    assert_response :bad_request
  end

  test "update modifies an existing task and returns it" do
    task = tasks(:one)

    patch task_url(task), params: {
      task: { status: "done", estimate_hours: 6 }
    }

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal "done", body["status"]
    assert_equal 6, body["estimate_hours"]
    assert_equal "done", task.reload.status
  end

  test "summary returns aggregate task counts and hours" do
    get summary_url
    assert_response :success

    body = JSON.parse(response.body)
    tasks = Task.all

    assert_equal tasks.count, body["total_tasks"]
    assert_equal tasks.sum(:estimate_hours), body["total_estimated_hours"]
    assert_equal tasks.where(status: "open").count, body["open_tasks"]
    assert_equal tasks.where(status: "in_progress").count, body["in_progress"]
    assert_equal tasks.where(risk_level: "high").count, body["high_risk"]
  end
end
