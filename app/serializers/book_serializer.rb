class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :author, :illustrator, :genre

  # attribute :average_rating do |object|
  #   (object.average_rating.to_f /100).to_f.round(2)
  # end

  # def average_rating
  #   object.avg_rating
  # end


  has_many :reviews
end
