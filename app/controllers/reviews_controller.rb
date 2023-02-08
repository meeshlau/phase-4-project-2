class ReviewsController < ApplicationController
    before_action :find_review, only: [:show]
    # skip_before_action :authenticate_user
    before_action :is_owner, only: [:update, :destroy]
    before_action :is_authorized?, only: [:index, :show]

    def index
        @review = Review.all
        render json: @review
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
        review = Review.find_by(id: params[:review_id])

        if review.present?
            review.update(update_review_params)
            render json: review, status: :accepted
        else
            render json: {errors: "This review does not exist."}, status: 422
        end
    end

    def destroy
        review = Review.find_by(id: params[:review_id])
        # debugger
        if review.present?
            review.destroy
            head :no_content
        end
    end

    private

    def review_params
        params.permit(:id, :book_id, :user_id, :review_comment, :rating, :review_id, :review)
    end

    def update_review_params
        params.permit(:review_comment, :rating, :updated_at, :id)
    end

    def find_review
        review = Review.find_by(id: params[:review_id])
    end

    # def is_owner?
    #     review = Review.find_by(id: params[:id])
    #     # debugger
    #     permitted = review == current_user.id
    #     render json: { errors: {User: "is not authorized" }, status: :forbidden}
    # end

    def is_owner
        if Review.find_by(id: params[:id]) != current_user
            {error: "You do not have permission to do that."}
        end
    end
end