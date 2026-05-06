class DecisionsController < ApplicationController
  def index
    render json: Decision.all.order(created_at: :desc)
  end

  def create
    render json: Decision.create!(decision_params)
  end

  def update
    decision = Decision.find(params[:id])
    decision.update!(decision_params)
    render json: decision
  end

  private

  def decision_params
    params.require(:decision).permit(:title, :context, :decision, :tradeoffs)
  end
end
