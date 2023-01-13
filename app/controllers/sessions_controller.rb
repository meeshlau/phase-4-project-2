class SessionsController < ApplicationController
    skip_before_action :authenticate_user, only: [:create, :destroy]
    
    def create
        user = User.find_by_username(params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id

            render json: user, status: :ok
        else
            render json: { errors: "Invalid username or password" }, status: :unauthorized
        end
    end

    def destroy
        session.destroy
        head :no_content
    end

    private
    def session_params
        params.require(:user).permit(:username, :password)
    end
end
