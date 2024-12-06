import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={css.container}>
      <p>
        Oops! Page not found! Please go to{' '}
        <span className={css.homePageLink}>
          <Link to="/">home page</Link>
        </span>
      </p>
    </div>
  );
}
