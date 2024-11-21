import { useParams } from 'react-router-dom';
import React from 'react';

export default function TravelTruckDetails() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <p> Now showing product with id - {id}</p>
    </div>
  );
}
