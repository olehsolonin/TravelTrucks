import { useSelector } from 'react-redux';
import css from './Reviews.module.css';

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
                <p> {review.reviewer_name}</p>
                <p>{review.reviewer_rating}</p>
              </div>
              <p> {review.comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
