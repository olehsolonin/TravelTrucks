import css from './CharacteristicsIcons.module.css';
import { MdOutlineGasMeter } from 'react-icons/md';
import { IoWaterOutline } from 'react-icons/io5';
import { LuMicrowave } from 'react-icons/lu';

export default function CharacteristicsIcons({ details }) {
  return (
    <ul className={css.filterIconsContainer}>
      {/* <li className={css.filterIcons}>Automatic</li> */}
      {details.gas && (
        <li className={css.filterIcons}>
          <span>
            {/* <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Gas"></use>
            </svg> */}
            <MdOutlineGasMeter className={css.svgIconStyle} />
          </span>
          Gas
        </li>
      )}
      {details.kitchen && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Kitchen"></use>
            </svg>
          </span>
          Kitchen
        </li>
      )}
      {details.AC && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-AC"></use>
            </svg>
          </span>{' '}
          AC
        </li>
      )}
      {details.TV && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-TV"></use>
            </svg>
          </span>
          TV
        </li>
      )}
      {details.water && (
        <li className={css.filterIcons}>
          <span>
            {/* <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Water"></use>
            </svg> */}
            <IoWaterOutline className={css.svgIconStyle} />
          </span>
          Water
        </li>
      )}

      {details.refrigerator && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Refrigerator"></use>
            </svg>
          </span>
          Refrigerator
        </li>
      )}

      {details.radio && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Radio"></use>
            </svg>
          </span>
          Radio
        </li>
      )}

      {details.microwave && (
        <li className={css.filterIcons}>
          <span>
            {/* <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Microwave"></use>
            </svg> */}
            <LuMicrowave className={css.svgIconStyle} />
          </span>
          Microwave
        </li>
      )}

      {details.bathroom && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Bathroom"></use>
            </svg>
          </span>
          Bathroom
        </li>
      )}
      {/* {details.form && (
        <li className={css.filterIcons}>
          {details.form.charAt(0).toUpperCase() + details.form.slice(1)}
        </li>
      )} */}
      {details.transmission && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Automatic"></use>
            </svg>
          </span>
          {details.transmission.charAt(0).toUpperCase() +
            details.transmission.slice(1)}
        </li>
      )}
      {details.engine && (
        <li className={css.filterIcons}>
          <span>
            <svg className={css.svgIconStyle} width="20" height="20">
              <use xlinkHref="/img/symbol-defs.svg#icon-Petrol"></use>
            </svg>
          </span>
          {details.engine.charAt(0).toUpperCase() + details.engine.slice(1)}
        </li>
      )}
    </ul>
  );
}
