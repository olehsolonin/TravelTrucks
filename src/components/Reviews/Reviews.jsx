import { useSelector } from 'react-redux';
import css from './Reviews.module.css';
import { FaStar } from 'react-icons/fa6';

export default function Reviews() {
  const allDetailsById = useSelector(state => state.details.items);
  console.log(allDetailsById.reviews);
  const reviews = allDetailsById.reviews;
  return (
    <div>
      <ul className={css.reviewsContainer}>
        {reviews.map((review, index) => {
          return (
            <li key={index}>
              <div className={css.reviewNameStar}>
                <div>
                  <p className={css.reviewNameFirstLetter}>
                    {review.reviewer_name.charAt(0)}
                  </p>
                </div>
                <div className={css.starsReview}>
                  <p> {review.reviewer_name}</p>
                  <ul className={css.stars}>
                    {[...Array(5)].map((_, index) => (
                      <li key={index}>
                        <FaStar
                          className={
                            index < review.reviewer_rating
                              ? css.star
                              : css.emptyStar
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={css.reviewComment}> {review.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
