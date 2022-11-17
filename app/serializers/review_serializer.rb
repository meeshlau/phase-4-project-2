class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review_comment, :rating, :book_id, :user_id

  belongs_to :book
end