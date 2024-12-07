import { useParams, useNavigate } from 'react-router-dom';
import {
  Routes,
  Route,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';
// import React from 'react';
import { getOneCarDetails } from '../../fetchReq.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './TravelTruckDetails.module.css';
import Features from '../Features/Features.jsx';
import Reviews from '../Reviews/Reviews.jsx';

export default function TravelTruckDetails() {
  const { id } = useParams();
  console.log(id);
  const location = useLocation();

  //підписка і отримання даних зі стору з станом.
  const allDetails = useSelector(state => state.details.items);

  const addDetails = caravanDetails => {
    return {
      type: 'details/addDetails',
      payload: caravanDetails,
    };
  };

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllDetailsAboutCar() {
      try {
        const res = await getOneCarDetails(id);
        console.log(res.data);
        // використовуємо діспатч і відправляємо екшен в стор для обробки редюсером.
        dispatch(addDetails(res.data));
        return res.data;
      } catch (error) {
        console.log(error);
      }
    }

    getAllDetailsAboutCar();
  }, [id, dispatch]);

  if (!allDetails || allDetails.length === 0) {
    return <p>Loading details...</p>;
  }

  //   const {
  //     name,
  //     price,
  //     rating,
  //     location,
  //     description,
  //     form,
  //     length,
  //     width,
  //     height,
  //     tank,
  //     consumption,
  //     transmission,
  //     engine,
  //     AC,
  //     bathroom,
  //     kitchen,
  //     TV,
  //     radio,
  //     refrigerator,
  //     microwave,
  //     gas,
  //     water,
  //     gallery = [],
  //     reviews = [],
  //   } = allDetails;
  return (
    <div className={css.mainDetailContainer}>
      <div className={css.detailsContainer}>
        <div className={css.namePrice}>
          <div className={css.priceName}>
            <p className={css.nameTitle}>{allDetails.name}</p>
          </div>
          <div className={css.ratingLocation}>
            <div className={css.ratingPart}>
              <p>
                {allDetails.rating}{' '}
                <span>({allDetails.reviews?.length || 0} Reviews)</span>
              </p>
              <p>{allDetails.location}</p>
            </div>
            <p>{allDetails.price}</p>
          </div>
        </div>
      </div>
      <div className={css.photoDetails}>
        {allDetails.gallery.length > 0 ? (
          allDetails.gallery.map((photo, index) => (
            <img
              key={index}
              src={photo.thumb || ''}
              alt={`photo-${index}`}
              className={css.photoDetailsImg}
            />
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
      <div className={css.descriptionDetails}>
        <p>{allDetails.description}</p>
      </div>
      <div className={css.moreInfoDetails}>
        <nav>
          <NavLink to="features">Features</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </nav>
      </div>
      <hr className={css.line} />
      <div className={css.orderFormConrtainer}>
        <div className={css.leftConrtainer}>
          {location.pathname.endsWith('/features') && (
            <Features params={allDetails} />
          )}
          {location.pathname.endsWith('/reviews') && (
            <Reviews params={allDetails} />
          )}
        </div>
        <div className={css.rightConrtainer}></div>
      </div>
      {/* <Outlet /> */}
    </div>
  );
}
