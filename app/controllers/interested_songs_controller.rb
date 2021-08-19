class InterestedSongsController < ApplicationController

    def index
        songs = InterestedSong.all
        render json: songs
    end

    def show
        song = InterestedSong.find(params[:id])
        render json: song
    end

    def create
        song = InterestedSong.new(song_params)

        if song.save
            render json: song
        else
            render json: {errors: song.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        song = InterestedSong.find(params[:id])
        user = song.user
        song.destroy
        songs = user.interested_songs

        render json: songs
    end

    def destroyer
        song = InterestedSong.find(params[:id])
        song.destroy

        render json: song
    end

    def update
        song = InterestedSong.find(params[:id])
        song[:title] = params[:title]
        song[:artist] = params[:artist]
        song[:genre] = params[:genre]
        song.save
        render json: InterestedSong.all
    end

    def destroyer
        song = InterestedSong.find(params[:id])
        song.destroy

        render json: song
    end

    private

    def song_params
        params.require(:interested_song).permit(:user_id, :title, :artist, :genre)
    end

end
