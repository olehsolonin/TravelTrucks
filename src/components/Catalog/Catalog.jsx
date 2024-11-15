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
    <div>
      <h1>Latest articles</h1>

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
