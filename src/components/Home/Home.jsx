import css from '../Home/Home.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/catalog'); // Переход на маршрут signUp
  };

  return (
    <div className={css.home}>
      <h1 className={css.mainTitle}>Campers of your dreams</h1>
      <p className={css.text}>
        You can find everything you want in our catalog
      </p>
      <button className={css.btn} onClick={handleButtonClick}>
        Try tracker
      </button>
    </div>
  );
}
