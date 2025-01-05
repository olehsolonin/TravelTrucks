import { useEffect, useState, useId } from 'react';
// import { fetchCatalog } from '../../fetchReq.js';
import css from '../Catalog/Catalog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Formik, Form, Field, useFormik } from 'formik';
import { getFilteredRequest } from '../../fetchReq.js';
import Loader from '../Loader/Loader.jsx';
import toast, { Toaster } from 'react-hot-toast';
import CharacteristicsIcons from '../CharacteristicsIcons/CharacteristicsIcons.jsx';
import { BsSuitHeart } from 'react-icons/bs';
import { BsWind } from 'react-icons/bs';
import { BsMap } from 'react-icons/bs';

export default function Catalog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams(); // Используем useSearchParams для управления строкой запроса.
  // створюємо dispatc для подальшої відправки екнешнів
  const dispatch = useDispatch();

  const resetFilterSettings = {
    location: '',
    AC: false,
    transmission: false,
    kitchen: false,
    TV: false,
    bathroom: false,
    form: '',
    limit: 5,
    page: 1,
  };

  const cleanFiltersReset = Object.fromEntries(
    Object.entries(resetFilterSettings).filter(
      ([_, value]) => value != null && value !== '' && value !== false
    )
  );

  // роблю навігацію з загального каталогу, на сторінку конкретного авто
  const showMoreBtn = id => {
    navigate(`/catalog/${id}`);
  };

  // підписка на стор (Для того щоб в компоненті отримати дані зі стору, у бібліотеці React Redux є хук useSelector(selector).)

  const currentFetchData = useSelector(state => state.data.items);
  const filter = useSelector(state => state.filters.status);
  const currentPageParams = useSelector(state => state.filters.status.page);
  const currentLimitParams = useSelector(state => state.filters.status.limit);
  const currentTogglerState = useSelector(state => state.data.totalItems);

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

  const newPagePart = pageParams => {
    const newPageData = Number(pageParams) + 1;

    //  console.log(newPageData);
    return {
      type: 'filters/addMorePage',
      payload: newPageData,
    };
  };

  const restartPageNumber = () => {
    return {
      type: 'filters/pageOne',
      payload: 1,
    };
  };

  //   const changeToggler = currentToggler => {
  //     return {
  //       type: 'data/toggler',
  //       payload: currentToggler,
  //     };
  //   };

  const buttonOn = () => {
    return {
      type: 'data/buttonOn',
      payload: false,
    };
  };

  const buttonOff = () => {
    return {
      type: 'data/buttonOff',
      payload: true,
    };
  };

  const resetFiltersAction = resetFilterSettings => {
    return {
      type: 'filters/resetFilters',
      payload: resetFilterSettings,
    };
  };

  const resetCatalogItems = () => {
    return {
      type: 'data/deleteCatalog',
      payload: [],
    };
  };

  useEffect(() => {
    async function getAllCatalog() {
      const cleanFilters = Object.fromEntries(
        Object.entries(resetFilterSettings).filter(
          ([_, value]) => value != null && value !== '' && value !== false
        )
      );
      console.log(cleanFilters);

      if (location.pathname === '/catalog') {
        navigate(`/catalog?limit=5&page=1`);
        dispatch(resetFiltersAction(resetFilterSettings));
        dispatch(resetCatalogItems());
      }
      try {
        //   setLoading(true);
        const res = await getFilteredRequest(cleanFilters);
        console.log(res.items);
        console.log(res.total);
        const totalItems = res.total;
        const totalPages = Math.ceil(totalItems / 5);
        console.log(totalPages);
        //   console.log(totalPages);
        //   console.log(currentTogglerState);
        //   if (currentPageParams >= totalPages) {
        //     dispatch(changeToggler(currentTogglerState));
        //   }
        dispatch(getCatalog(res.items));
      } catch (error) {
        console.log(error);
        toast.error('Ooops, some error, refresh the page...');
      } finally {
        //   setLoading(false);
      }
    }

    getAllCatalog();
  }, []);

  const handleSubmit = async (values, actions) => {
    // тут, в modifiedValues додав перевірку на активацію і зміну значення поля values.transmission, щоб при активації була зміна знеачененя на automatic
    const modifiedValues = {
      ...values,
      transmission: values.transmission ? 'automatic' : '',
    };
    console.log(typeof values);
    console.log(modifiedValues);
    console.log(filter);

    // Сброс фильтров и состояния
    dispatch(resetFiltersAction(resetFilterSettings));
    dispatch(resetCatalogItems());
    dispatch(buttonOn());

    // Формируем чистые фильтры, исключая пустые значения
    const cleanFilters = Object.fromEntries(
      Object.entries(modifiedValues).filter(
        ([_, value]) => value != null && value !== '' && value !== false
      )
    );
    console.log(cleanFilters);

    // Здесь добавляем или изменяем параметр 'page' в cleanFilters
    cleanFilters.page = 1; // Сбрасываем номер страницы на 1

    console.log(cleanFilters);

    // Отправляем обновленные фильтры в Redux
    dispatch(addFilters(cleanFilters));

    try {
      setLoading(true);
      setSearchParams(cleanFilters);

      // Получаем обновленные данные с фильтрами
      const res = await getFilteredRequest(cleanFilters);
      console.log(res.items);
      console.log(res.total);

      const totalItems = res.total;
      const totalPages = Math.ceil(totalItems / 5);
      console.log(totalPages);
      // const newPageData = Number(currentPageParams) + 1;
      // console.log(newPageData);
      if (Number(cleanFilters.page) >= totalPages) {
        dispatch(buttonOff());
        setSearchParams(cleanFiltersReset);
        dispatch(resetFiltersAction(resetFilterSettings));
      }
      // console.log(totalPages);

      // Диспатчим данные в Redux
      dispatch(getCatalog(res.items));
      // actions.resetForm();
      // actions.setTouched({});
      // actions.setValues(resetFilterSettings);
      setLoading(false);

      return res.items;
    } catch (error) {
      console.log(error);
      actions.resetForm();
      dispatch(resetFiltersAction(resetFilterSettings));
      setSearchParams(cleanFiltersReset);
    } finally {
      setLoading(false);
      actions.resetForm({
        values: resetFilterSettings,
        touched: {},
      });
      // setSearchParams({});
    }
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

  //   const resetFilterSettings = {
  //     location: '',
  //     AC: '',
  //     transmission: '',
  //     kitchen: '',
  //     TV: '',
  //     bathroom: '',
  //     form: '',
  //     limit: 5,
  //     page: 1,
  //   };

  const handleLoadMore = async () => {
    try {
      console.log('salam brat');
      const newPageData = Number(currentPageParams) + 1;
      console.log('Новое значение страницы:', newPageData);

      // Диспатчим новый параметр
      dispatch(newPagePart(currentPageParams));

      // Формируем обновлённый фильтр
      const updatedFilter = { ...filter, page: newPageData };
      console.log('Обновлённый фильтр:', updatedFilter);
      setSearchParams(updatedFilter);

      // Используем обновлённый фильтр для запроса
      const res = await getFilteredRequest(updatedFilter);
      console.log(res.items);
      console.log(res.total);

      // Обновляем каталог
      dispatch(getCatalog(res.items));

      // Проверяем, достигли ли конца
      const totalItems = res.total;
      const totalPages = Math.ceil(totalItems / currentLimitParams);
      if (newPageData >= totalPages) {
        dispatch(buttonOff());
        setSearchParams(cleanFiltersReset);
        dispatch(resetFiltersAction(resetFilterSettings));
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className={css.mainCatalogContainer}>
      {loading && <Loader />}
      <div className={css.filtersColumn}>
        <Formik
          initialValues={{
            location: filter.location || '', // Строка по умолчанию
            AC: filter.AC || false, // Булевое значение по умолчанию
            transmission: filter.transmission || false,
            kitchen: filter.kitchen || false,
            TV: filter.TV || false,
            bathroom: filter.bathroom || false,
            form: filter.form || '',
            limit: filter.limit || 5,
            page: filter.page || 1,
          }}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={css.locationBox}>
              <p className={css.locationTitle}>Location</p>
              <label htmlFor={LocationId}></label>
              <Field
                type="text"
                name="location"
                id={LocationId}
                placeholder="City"
                className={css.locationInput}
              />
            </div>
            <p className={css.filtersTitle}>Filters</p>
            <div className={css.vehicleEquipmentContainer}>
              <p className={css.equipmentTitle}>Vehicle equipment</p>
              <hr />
              <div className={css.filterBlocksContainer}>
                <div className={css.checkboxContainer}>
                  <Field
                    type="checkbox"
                    name="AC"
                    id={ACId}
                    className={css.hiddenCheckbox}
                  />

                  <label htmlFor={ACId} className={css.customCheckbox}>
                    <BsWind className={css.customSvgIcon} />
                    AC
                  </label>
                </div>

                <div className={css.checkboxContainer}>
                  <Field
                    type="checkbox"
                    name="transmission"
                    id={TransmissionId}
                    className={css.hiddenCheckbox}
                  />
                  <label
                    htmlFor={TransmissionId}
                    className={css.customCheckbox}
                  >
                    <svg className={css.customSvgIcon}>
                      <use xlinkHref="/img/symbol-defs.svg#icon-Automatic"></use>
                    </svg>
                    Automatic
                  </label>
                </div>

                <div className={css.checkboxContainer}>
                  <Field
                    type="checkbox"
                    name="kitchen"
                    id={KitchenId}
                    className={css.hiddenCheckbox}
                  />
                  <label htmlFor={KitchenId} className={css.customCheckbox}>
                    <svg className={css.customSvgIcon}>
                      <use xlinkHref="/img/symbol-defs.svg#icon-Kitchen"></use>
                    </svg>
                    Kitchen
                  </label>
                </div>

                <div className={css.checkboxContainer}>
                  <Field
                    type="checkbox"
                    name="TV"
                    id={TVId}
                    className={css.hiddenCheckbox}
                  />
                  <label htmlFor={TVId} className={css.customCheckbox}>
                    <svg className={css.customSvgIcon}>
                      <use xlinkHref="/img/symbol-defs.svg#icon-TV"></use>
                    </svg>
                    TV
                  </label>
                </div>

                <div className={css.checkboxContainer}>
                  <Field
                    type="checkbox"
                    name="bathroom"
                    id={BathroomId}
                    className={css.hiddenCheckbox}
                  />
                  <label htmlFor={BathroomId} className={css.customCheckbox}>
                    <svg className={css.customSvgIcon}>
                      <use xlinkHref="/img/symbol-defs.svg#icon-Bathroom"></use>
                    </svg>
                    Bathroom
                  </label>
                </div>
              </div>
            </div>
            <div className={css.vehicleTypeContainer}>
              <p className={css.equipmentTitle}>Vehicle type</p>
              <hr />
              <div className={css.filterBlocksContainerType}>
                <div className={css.checkboxContainer}>
                  <Field
                    type="radio"
                    name="form"
                    value="panelTruck"
                    id={VanId}
                    className={css.hiddenCheckbox}
                  />
                  <label htmlFor={VanId} className={css.customCheckbox}>
                    <svg className={css.customSvgIcon}>
                      <use xlinkHref="/img/symbol-defs.svg#icon-Van"></use>
                    </svg>
                    Van
                  </label>
                </div>
                <div className={css.checkboxContainer}>
                  <Field
                    type="radio"
                    name="form"
                    value="fullyIntegrated"
                    id={FullyIntegratedId}
                    className={css.hiddenCheckbox}
                  />
                  <label
                    htmlFor={FullyIntegratedId}
                    className={css.customCheckbox}
                  >
                    <svg className={css.customSvgIcon}>
                      <use xlinkHref="/img/symbol-defs.svg#icon-Fully"></use>
                    </svg>
                    Fully Integrated
                  </label>
                </div>
                <div className={css.checkboxContainer}>
                  <Field
                    type="radio"
                    name="form"
                    value="alcove"
                    id={AlcoveId}
                    className={css.hiddenCheckbox}
                  />
                  <label htmlFor={AlcoveId} className={css.customCheckbox}>
                    <svg className={css.customSvgIcon}>
                      <use xlinkHref="/img/symbol-defs.svg#icon-Alcove"></use>
                    </svg>
                    Alcove
                  </label>
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
        <div>
          <ul className={css.catalogContainer}>
            {currentFetchData.map(param => (
              //   setCaravanId(id),
              <li key={param.id} className={css.catalogItem}>
                <div className={css.imgContainer}>
                  <img
                    src={param.gallery[0].thumb}
                    alt="photo"
                    className={css.catalogPhoto}
                    width="292"
                    height="320"
                  />
                </div>
                <div className={css.detailsContainer}>
                  <div className={css.namePrice}>
                    <div className={css.priceName}>
                      <p className={css.nameTitle}>{param.name}</p>
                      <p className={css.priceBlock}>
                        €{param.price}.00{' '}
                        <span>
                          <BsSuitHeart />
                        </span>
                      </p>
                    </div>
                    <div className={css.ratingLocation}>
                      <p className={css.ratingContainer}>
                        <span>
                          <svg className={css.ratingStar}>
                            <use xlinkHref="/img/symbol-defs.svg#icon-Rating-active"></use>
                          </svg>
                        </span>
                        {param.rating}{' '}
                        <span>({param.reviews.length}Reviews)</span>
                      </p>
                      <p className={css.mapLocation}>
                        <span>
                          <BsMap />
                        </span>
                        {param.location}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className={css.descriptionText}>{param.description}</p>
                  </div>
                  <div>
                    <CharacteristicsIcons details={param} />
                  </div>
                  <button
                    type="submit"
                    className={css.buttonSearchCatalog}
                    onClick={() => showMoreBtn(param.id)}
                  >
                    Show more
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {!currentTogglerState && (
            <div className={css.loadMoreContainer}>
              {' '}
              <button
                type="button"
                className={css.buttonLoadMore}
                onClick={handleLoadMore}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}
