import { Routes, Route, NavLink } from 'react-router-dom';
import Home from '../Home/Home.jsx';
import Catalog from '../Catalog/Catalog.jsx';
import TravelTruckDetails from '../TravelTruckDetails/TravelTruckDetails.jsx';
import clsx from 'clsx';
import css from '../App/App.module.css';
import logo from '../../img/Logo.svg';
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
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<TravelTruckDetails />} />
        {/* <Route path="/products" element={<Products />} />
	        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}
