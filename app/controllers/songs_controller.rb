class SongsController < ApplicationController
    def index
        songs = Song.all
        render json: songs
    end

    def show
        song = Song.find(params[:id])
        render json: song
    end

    def get_songs
        song = Song.find(params[:id])
        render json: song.songs
    end

    def get_interests
        song = song.find(params[:id])
        render json: song.interested_songs
    end

    def create
        song = Song.new(song_params)
      
        if song.save
            render json: song, status: :created
        else
            render json: {error: song.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def test
        byebug
    end

    private

    def song_params
        params.require(:song).permit(:user_id, :title, :artist, :genre, :lyrics, :my_ability_level, :singable, :tabs, :notes, :recording, :year_learned)
    end
end
