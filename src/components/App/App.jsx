import { Routes, Route, NavLink } from 'react-router-dom';
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
// import NotFound from 'path/to/pages/NotFound';

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
          <Route path="Features" element={<Features />} />
          <Route path="Reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
}
