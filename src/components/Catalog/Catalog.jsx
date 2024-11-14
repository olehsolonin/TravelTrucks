import { useEffect } from 'react';
import { fetchCatalog } from '../../fetchReq.js';

export default function Catalog() {
  useEffect(() => {
    async function getAllCatalog() {
      try {
        const data = await fetchCatalog();
        console.log(data.items);
        //   setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCatalog();
  }, []);

  return (
    <div>
      <p>Catalog brat</p>
    </div>
  );
}
