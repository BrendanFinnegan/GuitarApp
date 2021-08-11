class SessionsController < ApplicationController

    def create
        user = User.find_by(email: params[:user][:email])
        # byebug
        if user && user.authenticate(params[:user][:password])
            session[:user_id] = user.id
            render json: {id: user.id, name: user.name}
        else
            render json: {error: ["invalid email and/or password"]}
        end
    end
end
