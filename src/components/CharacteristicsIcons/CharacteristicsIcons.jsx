import css from './CharacteristicsIcons.module.css';

export default function CharacteristicsIcons({ details }) {
  return (
    <ul className={css.filterIconsContainer}>
      {/* <li className={css.filterIcons}>Automatic</li> */}
      {details.gas && <li className={css.filterIcons}>Gas</li>}
      {details.kitchen && <li className={css.filterIcons}>Kitchen</li>}
      {details.AC && <li className={css.filterIcons}>AC</li>}
      {details.TV && <li className={css.filterIcons}>TV</li>}
      {details.water && <li className={css.filterIcons}>Water</li>}

      {details.refrigerator && (
        <li className={css.filterIcons}>Refrigerator</li>
      )}

      {details.radio && <li className={css.filterIcons}>Radio</li>}

      {details.microwave && <li className={css.filterIcons}>Microwave</li>}

      {details.bathroom && <li className={css.filterIcons}>Bathroom</li>}
      {details.form && (
        <li className={css.filterIcons}>
          {details.form.charAt(0).toUpperCase() + details.form.slice(1)}
        </li>
      )}
      {details.transmission && (
        <li className={css.filterIcons}>
          {details.transmission.charAt(0).toUpperCase() +
            details.transmission.slice(1)}
        </li>
      )}
      {details.engine && (
        <li className={css.filterIcons}>
          {details.engine.charAt(0).toUpperCase() + details.engine.slice(1)}
        </li>
      )}
    </ul>
  );
}
