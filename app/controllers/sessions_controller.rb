class SessionsController < ApplicationController

    def create
        user = User.find_by(email: params[:user][:email])
        # byebug
        if user && user.authenticate(params[:user][:password])
            session[:user_id] = user.id
            render json: {id: user.id, name: user.name}
        else
            render json: {error: ["Invalid email and/or password"]}
        end
    end

    def show
        user = User.find_by(id: session[:user_id])

        if user
            render json: {id: user.id, name: user.name}
        else
            render json: {message: ["no user signed in"]}
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end
end
