class ApiConnectionController < ApplicationController

    def fetcher
        new_request = ApiConnection.new
        data = new_request.fetch(params)

        render json: data

    end

end
