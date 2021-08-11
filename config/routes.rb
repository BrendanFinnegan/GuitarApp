Rails.application.routes.draw do
  
  resources :interested_songs
  resources :songs
  resources :users
  post "/log_in", to: "sessions#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
