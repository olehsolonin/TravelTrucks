import css from './Features.module.css';
import CharacteristicsIcons from '../CharacteristicsIcons/CharacteristicsIcons.jsx';
import { useSelector } from 'react-redux';

export default function Features() {
  const allDetailsById = useSelector(state => state.details.items);
  console.log(allDetailsById);
  return (
    <div>
      <CharacteristicsIcons details={allDetailsById} />
      <h2 className={css.vehicleTitle}>Vehicle details</h2>
      <hr />
      <ul className={css.itemsContainer}>
        <li className={css.itemBlock}>
          <p className={css.itemDetails}>Form</p>
          <p className={css.itemDetails}>{allDetailsById.form}</p>
        </li>
        <li className={css.itemBlock}>
          <p className={css.itemDetails}>Length</p>
          <p className={css.itemDetails}>{allDetailsById.length}</p>
        </li>
        <li className={css.itemBlock}>
          <p className={css.itemDetails}>Width</p>
          <p className={css.itemDetails}>{allDetailsById.width}</p>
        </li>
        <li className={css.itemBlock}>
          <p className={css.itemDetails}>Height</p>
          <p className={css.itemDetails}>{allDetailsById.height}</p>
        </li>
        <li className={css.itemBlock}>
          <p className={css.itemDetails}>Tank</p>
          <p className={css.itemDetails}>{allDetailsById.tank}</p>
        </li>
        <li className={css.itemBlock}>
          <p className={css.itemDetails}>Consumption</p>
          <p className={css.itemDetails}>{allDetailsById.consumption}</p>
        </li>
      </ul>
    </div>
  );
}
