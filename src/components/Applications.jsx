import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const formatDate = (dateString) => dateString.split("T")[0];

const Applications = () => {
  const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
  const [applications, setApplications] = useState([]);

  // Fetch applications from API
  useEffect(() => {
    axios
      .get(`${API_GATEWAY_BASE_URL}/adoptions`)
      .then((response) => {
        console.log("Successfully got applications from table:", response.data);
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  }, [API_GATEWAY_BASE_URL]);

  return (
    <div className="table-container">
      <h3>Applications</h3>

      <table>
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Phone #</th>
            <th>Pet IDs</th>
            <th>Pet Names</th>
            <th>Species</th>
            <th>Submitted On</th>
            <th># of Pets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* If empty */}
          {applications.length === 0 && (
            <tr>
              <td colSpan="9">No applications to show</td>
            </tr>
          )}

          {/* Map through each application */}
          {applications.map((application, index) => (
            <tr key={index}>
              <td>{application.applicant_name}</td>
              <td>{application.email}</td>
              <td>{application.phone}</td>
              <td>{application.pets.map((pet) => pet.id).join(", ")}</td>
              <td>{application.pets.map((pet) => pet.name).join(", ")}</td>
              <td>{application.pets.map((pet) => pet.species).join(", ")}</td>
              <td>{formatDate(application.submitted_at)}</td>
              <td>{application.pets.length}</td>
              <td>
                <Link to={`/applications/${application.id || index}`}>
                  View Details
                </Link>
                <button style={{ marginLeft: "10px" }}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
