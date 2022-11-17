class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]


    def index
        render json: User.all
    end
    
    def show
        # user = User.find(params[:id])
        render json: current_user, status: :ok
    end

    def create
        user = User.create!(user_params)
            session[:user_id] = user.id
            render json: user, status: :ok
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :email, :password)
    end

end
