class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :author, :illustrator, :genre

  has_many :reviews
end
