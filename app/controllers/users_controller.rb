class UsersController < ApplicationController
    skip_before_action :authenticate_user, only: [:create, :show, :index]


    def index
        render json: User.all
    end
    
    def show
        user = User.find_by(id: session[:user_id])
        # user = User.find(params[:id])
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

    # def create
    #     @user = User.new(user_params)
    #     if @user.save
    #         session[:user_id] = @user.id
    #         render json: {
    #             status: :created,
    #             user: @user
    #         } else
    #         @user.save
    #         render json: {
    #             status: 500,
    #             error: @user.errors.full_messages
    #         }
    #     end
    # end

    def destroy
        session.delete :user_id
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :user)
    end

end
