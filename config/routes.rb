Rails.application.routes.draw do
  
  resources :interested_songs
  resources :songs
  resources :users
  post "/log_in", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "sessions#show"
  get "/getsongs/:id", to: "users#get_songs"
  get "/getinterests/:id", to: "users#get_interests"
  patch "/editLyrics/:id", to: "songs#editLyrics"
  patch "/editNotes/:id", to: "songs#editNotes"
  get "/search", to: "api_connection#fetcher"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
