Rails.application.routes.draw do
  get '/hello', to: 'application#hello_world'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # get '*path',
  # to: 'fallback#index',
  # constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :books
  resources :reviews, only: [:index, :create, :destroy]
  resources :users, only: [:index, :show, :create, :show]
end
