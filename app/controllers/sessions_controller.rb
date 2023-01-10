class SessionsController < ApplicationController
    skip_before_action :authenticate_user, only: [:create, :destroy]

    def create
        @user = User.find_by(username: session_params[:username])
        if @user && @user.authenticate(session_params[:password])
            session[:user_id] = @user_id
            render json: {
                user: UserSerializer.new(@user)
            }
        else
            render json: {
                status: 401,
                error: "Could not authenticate your account"
            }
        end
    end

    def is_logged_in?
        @current_user = User.find(session[:user_id]) if session[:user_id]
        if @current_user
            render json: {
                logged_in: true,
                user: UserSerlializer.new(@current_user)
            }
        else
            render json: {
                logged_in: false
            }
        end
    end
    
    # def create
    #     user = User.find_by_username(params[:username])
    #     if user&.authenticate(params[:password])
    #         session[:user_id] = user.id

    #         render json: user, status: :ok
    #     else
    #         render json: { errors: "Invalid username or password" }, status: :unauthorized
    #     end
    # end

    def destroy
        session.delete(:user_id)
    end

    private
    def session_params
        params.require(:user).permit(:username, :password)
    end
end
