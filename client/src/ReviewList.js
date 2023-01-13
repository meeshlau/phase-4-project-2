import React from 'react'

function ReviewList({ reviews, users, books, selectedBook }) {
    return (
        <div>
            {/* {reviews.map(review =>
            <h3>{review.review_comment}</h3> 
            )} */}
            {books.map((book, index) => (
                <div key={index}>
                    <h2>{book.title}</h2>

                    {book.reviews.map((review, index) => (
                        <div key={index}>
                            <h4>{review.review_comment}</h4>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ReviewList