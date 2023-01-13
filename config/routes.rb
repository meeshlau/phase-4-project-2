Rails.application.routes.draw do
  
  get '/logged_in', to: 'sessions#is_logged_in?'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/auth", to: "users#show"
  post '/books/new', to: "books#create"
  post '/books/:book_id/reviews/new', to: "reviews#create"
  get '/books/:book_id/reviews', to: "reviews#show"

  # get '*path',
  # to: 'fallback#index',
  # constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :books
  resources :reviews, only: [:index, :show, :create, :destroy]
  resources :users, only: [:index, :show, :create, :show]
  resources :sessions, only: [:create, :destroy, :show]
end
