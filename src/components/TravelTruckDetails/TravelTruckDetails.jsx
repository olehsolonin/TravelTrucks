import { useParams } from 'react-router-dom';
// import React from 'react';
import { getOneCarDetails } from '../../fetchReq.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './TravelTruckDetails.module.css';

export default function TravelTruckDetails() {
  const { id } = useParams();
  console.log(id);

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

  //   console.log(res);
  return (
    <div className={css.mainDetailContainer}>
      <p> Now showing product with id - {id}</p>
      {/* <div className={css.detailsContainer}>
                  <div className={css.namePrice}>
                    <div className={css.priceName}>
                      <p className={css.nameTitle}>{name}</p>
                      <p>{price}</p>
                    </div>
                    <div className={css.ratingLocation}>
                      <p>
                        {rating} <span>({reviews.length}Reviews)</span>
                      </p>
                      <p>{location}</p>
                    </div>
                  </div> */}
    </div>
  );
}
