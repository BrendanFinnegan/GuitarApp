class ApiConnectionController < ApplicationController

    def fetcher
        new_request = ApiConnection.new
        data = new_request.fetch(params)

        render json: data

    end

    def lyric_fetcher
        new_request = ApiConnection.new
        data = new_request.lyric_fetch(params)

        render json: data

    end

end
