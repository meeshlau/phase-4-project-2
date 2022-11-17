class ReviewsController < ApplicationController
    # before_action :find_review, only: [:show]
    # skip_before_action :authenticate_user
    # before_action :is_authorized?, only: [:create]
    # before_action :is_owner?, only: [:update, :destroy]

    def index
        render json: Review.all
    end

    def show
        render json: @review, status: :ok
    end

    def create
        find_user = User.find_by(user_id: params[:user_id])

        if find_user
            review = Review.create!(review_params)
            render json: review, status: :created
        else
            render json: { errors: review.error.messages }, status: 422
        end
    end

    def update
        @review.update!(review_params)
        render json: @review, status: :accepted
    end

    def destroy
        @review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:id, :book_id, :user_id, :review_comment, :rating)
    end

    def find_review
        @review = Reveiw.find(params[:id])
    end

    def is_owner?
        permitted = @review.user_id == current_user.id
        render json: { errors: {User: "is not authorized" }, status: :forbidden unless permitted}
    end
end