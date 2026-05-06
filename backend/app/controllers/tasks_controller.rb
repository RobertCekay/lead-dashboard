class TasksController < ApplicationController
  def index
    render json: Task.all.order(created_at: :desc)
  end

  def create
    render json: Task.create!(task_params)
  end

  def update
    task = Task.find(params[:id])
    task.update!(task_params)
    render json: task
  end

  def summary
    tasks = Task.all

    render json: {
      total_tasks: tasks.count,
      total_estimated_hours: tasks.sum(:estimate_hours),
      open_tasks: tasks.where(status: "open").count,
      in_progress: tasks.where(status: "in_progress").count,
      high_risk: tasks.where(risk_level: "high").count
    }
  end

  private

  def task_params
    params.require(:task).permit(:title, :description, :estimate_hours, :risk_level, :status)
  end
end
