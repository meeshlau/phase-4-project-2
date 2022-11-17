class Book < ApplicationRecord
    has_many :reviews
    has_many :users, through: :reviews

    def avg_rating
        review = reviews.find(params[:book_id])
        review.average(:rating).round(2).to_i
    end
end
