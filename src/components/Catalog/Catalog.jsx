import { useEffect, useState } from 'react';
import { fetchCatalog } from '../../fetchReq.js';
import css from '../Catalog/Catalog.module.css';
import { useSelector, useDispatch } from 'react-redux';

export default function Catalog() {
  // підписка на стор (Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector).)

  const currentFetchData = useSelector(state => state.data.items);

  // Фабрика екшенів, створили відповідний екшен для зміни

  const getCatalog = caravanCatalog => {
    return {
      type: 'data/addCatalog',
      payload: caravanCatalog,
    };
  };

  // створюємо dispatchс для подальшої відправки екнешнів

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllCatalog() {
      try {
        const res = await fetchCatalog();
        // використовуємо діспатч і відправляємо екшен в стор для обробки редюсером.
        dispatch(getCatalog(res.items));
        return res.items;
      } catch (error) {
        console.log(error);
      }
    }

    getAllCatalog();
  }, [dispatch]);

  return (
    <div className={css.mainCatalogContainer}>
      <div className={css.filtersColumn}>
        <div className={css.locationBox}>
          <p className={css.locationTitle}>Location</p>
          <input type="text" className={css.locationInput} />
        </div>
        <p className={css.filtersTitle}>Filters</p>
        <div className={css.vehicleEquipmentContainer}>
          <p className={css.equipmentTitle}>Vehicle equipment</p>
          <hr />
          <ul className={css.filterBlocksContainer}>
            <li className={css.filterItemBlocks}>AC</li>
            <li className={css.filterItemBlocks}>Automatic</li>
            <li className={css.filterItemBlocks}>Kitchen</li>
            <li className={css.filterItemBlocks}>TV</li>
            <li className={css.filterItemBlocks}>Bathroom</li>
          </ul>
        </div>
        <div className={css.vehicleTypeContainer}>
          <p className={css.equipmentTitle}>Vehicle type</p>
          <hr />
          <ul className={css.typeBlocksContainer}>
            <li className={css.filterItemBlocks}>Van</li>
            <li className={css.filterItemBlocks}>Fully Integrated</li>
            <li className={css.filterItemBlocks}>Alcove</li>
          </ul>
        </div>
        <button type="submit" className={css.buttonSearch}>
          Search
        </button>
      </div>

      {currentFetchData.length > 0 && (
        <ul className={css.catalogContainer}>
          {currentFetchData.map(
            ({
              id,
              gallery,
              name,
              price,
              rating,
              reviews,
              location,
              description,
            }) => (
              <li key={id} className={css.catalogItem}>
                <div className={css.imgContainer}>
                  <img
                    src={gallery[0].thumb}
                    alt="photo"
                    className={css.catalogPhoto}
                    width="292"
                    height="320"
                  />
                </div>
                <div className={css.detailsContainer}>
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
                  </div>

                  <div>
                    <p className={css.descriptionText}>{description}</p>
                  </div>
                  <div>
                    <ul className={css.filterIconsContainer}>
                      <li className={css.filterIcons}>Automatic</li>
                      <li className={css.filterIcons}>Petrol</li>
                      <li className={css.filterIcons}>Kitchen</li>
                      <li className={css.filterIcons}>AC</li>
                    </ul>
                  </div>
                  <button type="submit" className={css.buttonSearchCatalog}>
                    Show more
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
