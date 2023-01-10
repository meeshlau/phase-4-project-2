class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create]


    def index
        render json: User.all
    end
    
    def show
        user = User.find(params[:id])
        render json: current_user, status: :ok
    end

    # def create
    #     user = User.create!(user_params)
    #         session[:user_id] = user.id
    #         render json: user, status: :ok
    # end

    def create
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            render json: {
                status: :created,
                user: @user
            } else
            @user.save
            render json: {
                status: 500,
                error: @user.errors.full_messages
            }
        end
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
