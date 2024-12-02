import { useEffect, useId } from 'react';
import { fetchCatalog } from '../../fetchReq.js';
import css from '../Catalog/Catalog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { getFilteredRequest } from '../../fetchReq.js';

export default function Catalog() {
  const navigate = useNavigate();

  // роблю навігацію з загального каталогу, на сторінку конкретного авто
  const showMoreBtn = id => {
    navigate(`/catalog/${id}`);
  };

  // підписка на стор (Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector).)

  const currentFetchData = useSelector(state => state.data.items);
  const filter = useSelector(state => state.filters.status);

  // Фабрика екшенів, створили відповідний екшен для зміни

  const getCatalog = caravanCatalog => {
    return {
      type: 'data/addCatalog',
      payload: caravanCatalog,
    };
  };

  const addFilters = activeFilters => {
    return {
      type: 'filters/addFilters',
      payload: activeFilters,
    };
  };

  // створюємо dispatc для подальшої відправки екнешнів

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

  const handleSubmit = async (values, actions) => {
    console.log(values);
    dispatch(addFilters(values));
    //  const filtersString = JSON.stringify(values);
    //  console.log(filtersString);
    const res = await getFilteredRequest(values);
    console.log(res.items);
    dispatch(getCatalog(res.items));
    actions.resetForm();
    return res.items;
  };

  const LocationId = useId();
  const ACId = useId();
  const TransmissionId = useId();
  const KitchenId = useId();
  const TVId = useId();
  const BathroomId = useId();
  const VanId = useId();
  const FullyIntegratedId = useId();
  const AlcoveId = useId();

  const initialValues = {
    location: '',
    AC: '',
    transmission: '',
    kitchen: '',
    TV: '',
    bathroom: '',
  };

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
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <div className={css.locationBox}>
              <p className={css.locationTitle}>Location</p>
              <label htmlFor={LocationId}></label>
              <Field
                type="text"
                name="location"
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
                  <label
                    htmlFor={TransmissionId}
                    className={css.customCheckbox}
                  >
                    Automatic
                  </label>
                  <Field
                    type="checkbox"
                    name="transmission"
                    id={TransmissionId}
                    className={css.hiddenCheckbox}
                  />
                </div>

                <div className={css.checkboxContainer}>
                  <label htmlFor={KitchenId} className={css.customCheckbox}>
                    Kitchen
                  </label>
                  <Field
                    type="checkbox"
                    name="kitchen"
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
                    name="bathroom"
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
              kitchen,
              AC,
              TV,
              bathroom,
              form,
              gas,
              microwave,
              radio,
              refrigerator,
              water,
              transmission,
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
                      {gas === true && <li className={css.filterIcons}>Gas</li>}
                      {kitchen === true && (
                        <li className={css.filterIcons}>Kitchen</li>
                      )}
                      {AC === true && <li className={css.filterIcons}>AC</li>}
                      {TV === true && <li className={css.filterIcons}>TV</li>}
                      {water === true && (
                        <li className={css.filterIcons}>Water</li>
                      )}

                      {refrigerator === true && (
                        <li className={css.filterIcons}>Refrigerator</li>
                      )}

                      {radio === true && (
                        <li className={css.filterIcons}>Radio</li>
                      )}

                      {microwave === true && (
                        <li className={css.filterIcons}>Microwave</li>
                      )}

                      {bathroom === true && (
                        <li className={css.filterIcons}>Bathroom</li>
                      )}
                      {form && <li className={css.filterIcons}>{form}</li>}
                      {transmission && (
                        <li className={css.filterIcons}>{transmission}</li>
                      )}
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
