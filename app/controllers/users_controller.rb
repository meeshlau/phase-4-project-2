class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]


    def index
        render json: User.all
    end
    
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { error: "Not Authorized" }, status: :unauthorized
        end
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
        params.require(:user).permit(:username, :password, :password_confirmation)
    end

end
