import { useParams } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
// import React from 'react';
import { getOneCarDetails } from '../../fetchReq.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './TravelTruckDetails.module.css';
import { Formik, Form, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { FeedbackSchema } from '../../FeedbackSchema.js';

export default function TravelTruckDetails() {
  const { id } = useParams();
  console.log(id);
  //   const location = useLocation();

  const initialValues = {
    username: '',
    email: '',
    date: '',
    usertext: '',
  };

  const handleSubmit = async (values, actions) => {
    console.log(values);
    const { username, date } = values;
    //  toast.success(`${JSON.stringify(values)}`);
    toast.success(
      `Dear ${username}, the reservation for ${date} successfully completed`
    );

    actions.resetForm();
  };

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
        <nav className={css.linksContainer}>
          <NavLink to="features" className={css.linksToDetails}>
            Features
          </NavLink>
          <NavLink to="reviews" className={css.linksToDetails}>
            Reviews
          </NavLink>
        </nav>
      </div>
      <hr className={css.line} />
      <div className={css.orderFormConrtainer}>
        <div className={css.leftConrtainer}>
          <Outlet />
        </div>
        <div className={css.rightConrtainer}>
          <div className={css.formTitleBlock}>
            <h2 className={css.formTitle}>Book your campervan now</h2>
            <p className={css.helpMessage}>
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={FeedbackSchema}
          >
            <Form>
              <div className={css.fieldsContainer}>
                <Field
                  type="text"
                  name="username"
                  placeholder="Name*"
                  className={css.dataField}
                />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={css.dataField}
                />
                <Field
                  type="date"
                  name="date"
                  placeholder="Booking date*"
                  className={css.dataField}
                />
                <Field
                  as="textarea"
                  name="usertext"
                  cols="20"
                  rows="5"
                  placeholder="Comment"
                  className={`${css.dataField} ${css.mod}`}
                />
              </div>

              <div className={css.buttonContainer}>
                <button type="submit" className={css.sendButton}>
                  Send
                </button>
              </div>
            </Form>
          </Formik>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
