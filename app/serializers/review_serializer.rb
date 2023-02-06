class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :review_comment, :rating, :book_id, :user_id, :updated_at

  belongs_to :book
end