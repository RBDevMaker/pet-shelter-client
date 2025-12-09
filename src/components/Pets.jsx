import { useState, useEffect } from "react";
import daysInShelter from "../utils";

// Use your S3 bucket URL from Vite env
const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;

// Single, clean function to get the image URL
function getImgUrl(fileName) {
  return `${S3_BUCKET_URL}${fileName}`;
}

export default function Pets({ pets }) {
  const [filter, setFilter] = useState("");

  const filteredPets = filter
    ? pets.filter((pet) => pet.species.toLowerCase() === filter.toLowerCase())
    : pets;

  return (
    <div className="pets">
      <h1>Available Pets</h1>
      <label>
        Filter by species:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
      </label>

      <div className="petsList">
        {filteredPets.map((pet) => (
          <div className="pet" key={pet.id}>
            <div style={{ width: "200px" }}>
              <img
                src={getImgUrl(pet.image)}
                alt={pet.name}
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
              />
            </div>
            <h2>{pet.name}</h2>
            <p>Age: {pet.age}</p>
            <p>Species: {pet.species}</p>
            <p>Date Entered: {pet.date_entered}</p>
            <p>
              In shelter for <strong>{daysInShelter(pet.date_entered)} days</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
