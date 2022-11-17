class BooksController < ApplicationController
    # skip_before_action :authenticate_user, only: [:index, :show]
    # before_action :is_authorized?, only: [:create, :update, :destroy]

    def index
        books = Book.all
        render json: books
    end

    def show
        book = Book.find(params[:id])
        render json: book
    end

    def create
        find_book = Book.find_by(title: params[:title])

        if find_book
            render json: { error: book.errors.messages }, status: 422
        else
            book = Book.create!(book_params)
            render json: book, status: :created
        end
    end

    def update
        book = Book.find(params[:id])
        book.update!(book_params)
        render json: book, status: :ok
    end

    def destroy
        book = Book.find(params[:id])
        book.destroy
        head :no_content
    end

    private

    def book_params
        params.permit(:id, :title, :author, :image_url, :illustrator, :genre)
    end
end
