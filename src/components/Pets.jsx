import { useState, useEffect } from "react";
import daysInShelter from "../utils";

// Use your S3 bucket URL from Vite env
const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;

// Single, clean function to get the image URL
function getImgUrl(fileName) {
  return `${S3_BUCKET_URL}${fileName}`;
}

export default function Pets({ pets, applications = [] }) {
  const [filter, setFilter] = useState("");

  const filteredPets = filter
    ? pets.filter((pet) => pet.species.toLowerCase() === filter.toLowerCase())
    : pets;

  // Check if a pet has been adopted (approved in any application)
  const isPetAdopted = (petId) => {
    return applications.some((app) =>
      app.pets.some((pet) => pet.id === petId && pet.status === "approved")
    );
  };

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
            <div style={{ width: "200px", position: "relative" }}>
              <img
                src={getImgUrl(pet.image)}
                alt={pet.name}
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
              />
              {isPetAdopted(pet.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "0",
                    height: "0",
                    borderTop: "70px solid #dc3545",
                    borderRight: "70px solid transparent",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "-58px",
                      left: "-6px",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "11px",
                      transform: "rotate(-45deg)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ADOPTED
                  </span>
                </div>
              )}
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
