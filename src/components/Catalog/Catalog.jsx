import { useEffect, useId } from 'react';
import { fetchCatalog } from '../../fetchReq.js';
import css from '../Catalog/Catalog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

export default function Catalog() {
  const navigate = useNavigate();

  // роблю навігацію з загального каталогу, на сторінку конкретного авто
  const showMoreBtn = id => {
    navigate(`/catalog/${id}`);
  };

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
        console.log(res.items);
        // використовуємо діспатч і відправляємо екшен в стор для обробки редюсером.
        dispatch(getCatalog(res.items));
        return res.items;
      } catch (error) {
        console.log(error);
      }
    }

    getAllCatalog();
  }, [dispatch]);

  const LocationId = useId();
  const ACId = useId();
  const AutomaticId = useId();
  const KitchenId = useId();
  const TVId = useId();
  const BathroomId = useId();
  const VanId = useId();
  const FullyIntegratedId = useId();
  const AlcoveId = useId();

  return (
    <div className={css.mainCatalogContainer}>
      <div className={css.filtersColumn}>
        {/* <div className={css.locationBox}>
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
        </button> */}
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <div className={css.locationBox}>
              <p className={css.locationTitle}>Location</p>
              <label htmlFor={LocationId}></label>
              <Field
                type="text"
                name="Location"
                id={LocationId}
                className={css.locationInput}
              />
            </div>
            <p className={css.filtersTitle}>Filters</p>
            <div className={css.vehicleEquipmentContainer}>
              <p className={css.equipmentTitle}>Vehicle equipment</p>
              <hr />
              <div className={css.filterBlocksContainer}>
                <div className={css.checkboxContainer}>
                  <label htmlFor={ACId} className={css.customCheckbox}>
                    AC
                  </label>
                  <Field
                    type="checkbox"
                    name="AC"
                    id={ACId}
                    className={css.hiddenCheckbox}
                  />
                </div>

                <div className={css.checkboxContainer}>
                  <label htmlFor={AutomaticId} className={css.customCheckbox}>
                    Email
                  </label>
                  <Field
                    type="checkbox"
                    name="Automatic"
                    id={AutomaticId}
                    className={css.hiddenCheckbox}
                  />
                </div>

                <div className={css.checkboxContainer}>
                  <label htmlFor={KitchenId} className={css.customCheckbox}>
                    Kitchen
                  </label>
                  <Field
                    type="checkbox"
                    name="Kitchen"
                    id={KitchenId}
                    className={css.hiddenCheckbox}
                  />
                </div>

                <div className={css.checkboxContainer}>
                  <label htmlFor={TVId} className={css.customCheckbox}>
                    TV
                  </label>
                  <Field
                    type="checkbox"
                    name="TV"
                    id={TVId}
                    className={css.hiddenCheckbox}
                  />
                </div>

                <div className={css.checkboxContainer}>
                  <label htmlFor={BathroomId} className={css.customCheckbox}>
                    Bathroom
                  </label>
                  <Field
                    type="checkbox"
                    name="Bathroom"
                    id={BathroomId}
                    className={css.hiddenCheckbox}
                  />
                </div>
              </div>
            </div>
            <div className={css.vehicleTypeContainer}>
              <p className={css.equipmentTitle}>Vehicle type</p>
              <hr />
              <div className={css.filterBlocksContainerType}>
                <div className={css.checkboxContainer}>
                  <label htmlFor={VanId} className={css.customCheckbox}>
                    Van
                  </label>
                  <Field
                    type="checkbox"
                    name="Van"
                    id={VanId}
                    className={css.hiddenCheckbox}
                  />
                </div>
                <div className={css.checkboxContainer}>
                  <label
                    htmlFor={FullyIntegratedId}
                    className={css.customCheckbox}
                  >
                    Fully Integrated
                  </label>
                  <Field
                    type="checkbox"
                    name="FullyIntegrated"
                    id={FullyIntegratedId}
                    className={css.hiddenCheckbox}
                  />
                </div>
                <div className={css.checkboxContainer}>
                  <label htmlFor={AlcoveId} className={css.customCheckbox}>
                    Alcove
                  </label>
                  <Field
                    type="checkbox"
                    name="Alcove"
                    id={AlcoveId}
                    className={css.hiddenCheckbox}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className={css.buttonSearch}>
              Search
            </button>
          </Form>
        </Formik>
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
              //   setCaravanId(id),
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
                  <button
                    type="submit"
                    className={css.buttonSearchCatalog}
                    onClick={() => showMoreBtn(id)}
                  >
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
