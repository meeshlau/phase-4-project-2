Rails.application.routes.draw do
  
  get '/logged_in', to: 'sessions#is_logged_in?'
  post '/login', to: 'sessions#create'
  post '/users/new', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'
  get "/auth", to: "users#show"
  post '/books/new', to: "books#create"
  post '/books/:book_id/reviews/new', to: "reviews#create"
  delete '/books/:book_id/reviews/:review_id', to: 'reviews#destroy'
  get '/books/:book_id/reviews', to: "reviews#show"
  patch '/books/:book_id/reviews/:review_id/update', to: 'reviews#update'


  # get '*path',
  # to: 'fallback#index',
  # constraints: ->(req) { !req.xhr? && req.format.html? }

  resources :books do
    resources :reviews
  end
  resources :reviews
  resources :users, only: [:index, :show, :create]
  resources :sessions, only: [:create, :destroy, :show]
end
