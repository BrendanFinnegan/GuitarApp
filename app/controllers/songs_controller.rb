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

    def update
        song = Song.find(params[:id])
        song[:title] = params[:title]
        song[:artist] = params[:artist]
        song[:genre] = params[:genre]
        song[:my_ability_level] = params[:my_ability_level]
        song[:year_learned] = params[:year_learned]
        song[:recording] = params[:recording]
        song[:singable] = params[:singable]
        song.save
        user = song.user

        render json: user.songs
    end

    def editLyrics
        song = Song.find(params[:id])
        song[:lyrics] = params[:lyrics]
        song.save

        user = song.user

        render json: user.songs
    end

    def editNotes
        song = Song.find(params[:id])
        song[:notes] = params[:notes]
        song.save
        user = song.user

        render json: user.songs
    end

    def editTabs
        song = Song.find(params[:id])
        song[:tabs] = params[:tabs]
        song.save

        user = song.user

        render json: user.songs
    end

    def songsbeingplayed
        user = User.find(params[:id])
        songs = user.songs.sample(5)
        render json: songs
    end

    def destroy
        song = Song.find(params[:id])
        song.destroy

        render json: song
    end

    private

    def song_params
        params.require(:song).permit(:user_id, :title, :artist, :genre, :lyrics, :my_ability_level, :singable, :tabs, :notes, :recording, :year_learned)
    end
end
