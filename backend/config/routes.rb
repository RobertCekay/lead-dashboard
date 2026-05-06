Rails.application.routes.draw do
  resources :tasks
  resources :decisions

  get "/summary", to: "tasks#summary"
end