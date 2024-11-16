import { useEffect, useState } from 'react';
import { fetchCatalog } from '../../fetchReq.js';
import css from '../Catalog/Catalog.module.css';

export default function Catalog() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAllCatalog() {
      try {
        const res = await fetchCatalog();
        setData(res.items);
        console.log(res);

        //   setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCatalog();
  }, []);

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

      {data.length > 0 && (
        <ul className={css.catalogContainer}>
          {data.map(({ id, gallery, name }) => (
            <li key={id} className={css.catalogItem}>
              {/* <a
                href={gallery[0].original}
                target="_blank"
                rel="noreferrer noopener"
              >
                {name}
              </a> */}
              <div className={css.imgContainer}>
                <img
                  src={gallery[0].thumb}
                  alt="photo"
                  className={css.catalogPhoto}
                  width="292"
                  height="320"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
