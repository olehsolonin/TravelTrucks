import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
// import Home from '../Home/Home.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx';
// import Catalog from '../Catalog/Catalog.jsx';
import CatalogPage from '../../pages/CatalogPage/CatalogPage.jsx';
// import TravelTruckDetails from '../TravelTruckDetails/TravelTruckDetails.jsx';
import TravelTruckDetailsPage from '../../pages/TravelTruckDetailsPage/TravelTruckDetailsPage.jsx';
import clsx from 'clsx';
import css from '../App/App.module.css';
import logo from '../../img/Logo.svg';
import Features from '../Features/Features.jsx';
import Reviews from '../Reviews/Reviews.jsx';
// import Products from 'path/to/pages/Products';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';

// Для того чтобы по умолчанию маршрут /catalog/:id перенаправлялся на вложенный маршрут /catalog/:id/features, можно использовать компонент <Navigate /> внутри маршрутов.//

{
  /*
          <Route index element={<Navigate to="features" replace />} />	
Что здесь происходит:
index маршрут:
Указывает, что он срабатывает по умолчанию, когда путь совпадает с /catalog/:id, но без дополнительных сегментов, например, /catalog/:id/features.

<Navigate to="features" replace />:
Выполняет перенаправление на вложенный маршрут /catalog/:id/features.

replace:
Заменяет текущий маршрут в истории, чтобы предотвратить возврат на /catalog/:id при использовании кнопки "Назад" в браузере.*/
}

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function App() {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <img
          className={css.desktopHeaderLogo}
          width="136"
          height="16"
          src={logo}
          alt="Logo"
        />

        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={buildLinkClass}>
            Сatalog
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<TravelTruckDetailsPage />}>
          <Route index element={<Navigate to="features" replace />} />
          <Route path="features" element={<Features />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
