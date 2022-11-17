# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
books = Book.create([
    {
        title: "Chicka Chicka Boom Boom",
        author: "Bill Martin Jr. and John Archambault",
        illustrator: "Lois Ehlert",
        genre: "Children's Literature",
        image_url: "https://pictures.abebooks.com/isbn/9780590438896-us.jpg"

    },
    {
        title: "Be Brave Little One",
        author: "Marianne Richmond",
        illustrator: "Marianne Richmond",
        genre: "Children's Literature",
        image_url: "https://m.media-amazon.com/images/I/51PSkXBdOcL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg"

    },
    {
        title: "The Very Hungry Caterpillar",
        author: "Eric Carle",
        illustrator: "Eric Carle",
        genre: "Children's Literature",
        image_url: "https://images.booksource.com/HandleImage.aspx?Large=True&img=9780399208539"

    },
    {
        title: "The Rainbow Fish",
        author: "Marcus Pfister",
        illustrator: "Marcus Pfister",
        genre: "Children's Literature",
        image_url: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781558580091/the-rainbow-fish-9781558580091_lg.jpg"

    },
    {
        title: "The Giving Tree",
        author: "Shel Silverstein",
        illustrator: "Shel Silverstein",
        genre: "Children's Literature",
        image_url: "https://upload.wikimedia.org/wikipedia/en/7/79/The_Giving_Tree.jpg"

    },
    {
        title: "I'm So Glad You Were Born",
        author: "Ainsley Earhardt",
        illustrator: "Kim Barnes",
        genre: "Children's Literature",
        image_url: "https://storage.googleapis.com/du-prd/books/images/9780310777021.jpg"

    },
])

users = User.create([
    {
        username: "mommy1985"
    },
    {
        username: "crazyreads123"
    },
    {
        username: "readhead99"
    },
    {
        username: "sunshine701"
    },
    {
        username: "misterbusinessman1"
    },
    {
        username: "teacherreads43"
    },
    {
        username: "nerdalert89"
    },
])

reviews = Review.create([
    {
        review_comment: "Loved it!",
        rating: 5,
        user_id: 2,
        book_id: 3
    },
    {
        review_comment: "Meh, it was okay.",
        rating: 3,
        user_id: 4,
        book_id: 3
    },
    {
        review_comment: "Meh, it was okay.",
        rating: 3,
        user_id: 4,
        book_id: 2
    }
])