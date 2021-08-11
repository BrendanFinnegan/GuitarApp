class UsersController < ApplicationController

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def get_songs
        user = User.find(params[:id])
        render json: user.songs
    end

    def get_interests
        user = User.find(params[:id])
        render json: user.interested_songs
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def test
        byebug
    end

    private

    def user_params
        params.permit(:name, :email, :password)
    end

end
