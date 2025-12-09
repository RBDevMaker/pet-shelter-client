import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const formatDate = (dateString) => dateString.split("T")[0];

const Applications = () => {
  const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  // Fetch applications from API
  const fetchApplications = () => {
    axios.get(`${API_GATEWAY_BASE_URL}/adoptions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Successfully got applications from table:", response.data);
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, [API_GATEWAY_BASE_URL]);

  // Handle status change for individual pet
  const handlePetStatusChange = async (application, pet, newStatus) => {
    if (!newStatus || newStatus === (pet.status || "pending")) return;

    try {
      await axios.put(
        `${API_GATEWAY_BASE_URL}/adoptions/${application.id}`,
        { pet_id: pet.id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (newStatus === "approved") {
        setSelectedApplication({ ...application, selectedPet: pet });
        setShowModal(true);
      }

      fetchApplications(); // Refresh the list
    } catch (error) {
      console.error("Error updating pet status:", error);
      alert("Failed to update pet status. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "#28a745";
      case "pending":
        return "#ffc107";
      case "pet_no_longer_available":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="table-container">
      <h3>Applications</h3>

      <table>
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Email</th>
            <th>Phone #</th>
            <th>Pet ID</th>
            <th>Pet Name</th>
            <th>Species</th>
            <th>Submitted On</th>
            <th>Status</th>
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

          {/* Map through each application and each pet */}
          {applications.map((application, appIndex) =>
            application.pets.map((pet, petIndex) => (
              <tr key={`${appIndex}-${petIndex}`}>
                {petIndex === 0 && (
                  <>
                    <td rowSpan={application.pets.length}>{application.applicant_name}</td>
                    <td rowSpan={application.pets.length}>{application.email}</td>
                    <td rowSpan={application.pets.length}>{application.phone}</td>
                  </>
                )}
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.species}</td>
                {petIndex === 0 && (
                  <td rowSpan={application.pets.length}>{formatDate(application.submitted_at)}</td>
                )}
                <td>
                  <span style={{
                    backgroundColor: getStatusColor(pet.status || "pending"),
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "capitalize"
                  }}>
                    {pet.status ? pet.status.replace(/_/g, " ") : "Pending"}
                  </span>
                </td>
                <td>
                  {petIndex === 0 && (
                    <Link to={`/applications/${application.id || appIndex}`}>
                      View Details
                    </Link>
                  )}
                  <select
                    value={pet.status || "pending"}
                    onChange={(e) => handlePetStatusChange(application, pet, e.target.value)}
                    style={{
                      marginLeft: petIndex === 0 ? "10px" : "0",
                      backgroundColor: getStatusColor(pet.status || "pending"),
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    <option value="pending" style={{ backgroundColor: "white", color: "black" }}>
                      Pending
                    </option>
                    <option value="approved" style={{ backgroundColor: "white", color: "black" }}>
                      Approved
                    </option>
                    <option value="pet_no_longer_available" style={{ backgroundColor: "white", color: "black" }}>
                      Pet No Longer Available
                    </option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Approval Modal */}
      {showModal && selectedApplication && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            maxWidth: "500px",
            textAlign: "center",
            border: "3px solid #28a745"
          }}>
            <div style={{
              fontSize: "48px",
              color: "#28a745",
              marginBottom: "20px"
            }}>
              ✓
            </div>
            <h2 style={{
              color: "#28a745",
              marginBottom: "20px",
              fontSize: "28px",
              fontWeight: "bold"
            }}>
              Application Approved!
            </h2>
            <p style={{
              fontSize: "18px",
              color: "#333",
              marginBottom: "10px",
              lineHeight: "1.6"
            }}>
              Congratulations! The adoption of <strong>{selectedApplication.selectedPet?.name}</strong> for <strong>{selectedApplication.applicant_name}</strong> has been approved.
            </p>
            <p style={{
              fontSize: "16px",
              color: "#666",
              marginBottom: "30px",
              lineHeight: "1.6"
            }}>
              Please schedule a pickup date and time with the applicant.
            </p>
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "25px",
              textAlign: "left"
            }}>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Email:</strong> {selectedApplication.email}
              </p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                <strong>Phone:</strong> {selectedApplication.phone}
              </p>
            </div>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "12px 30px",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
