class DecisionsController < ApplicationController
  def index
    render json: Decision.all
  end
end