class ReviewsController < ApplicationController
    before_action :find_review, only: [:show]
    skip_before_action :authenticate_user
    # before_action :is_owner?, only: [:update, :destroy]

    def index
        render json: Review.all
    end

    def show
        selected_book = Book.find_by(id: params[:id])

        book_reviews = Review.find_by(book_id: params[:book_id])
        render json: book_reviews, status: :ok
        
    end

    def create
        find_user = User.find_by(id: params[:user_id])

        if find_user
            review = Review.create!(review_params)
            render json: review, status: :created
            # byebug
        else
            render json: { errors: "error" }, status: 422
        end
    end

    def update
        @review.update!(review_params)
        render json: @review, status: :accepted
    end

    def destroy
        review = Review.find_by(id: params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:id, :book_id, :user_id, :review_comment, :rating)
    end

    def find_review
        @review = Review.find_by(id: params[:id])
    end

    def is_owner?
        permitted = @review.user_id == current_user.id
        render json: { errors: {User: "is not authorized" }, status: :forbidden}
    end
end