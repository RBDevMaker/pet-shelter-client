import { useState } from "react";

const Reports = ({ pets, applications, onClose }) => {
    const [selectedReport, setSelectedReport] = useState("overview");

    // Calculate statistics
    const totalPets = pets.length;
    const totalApplications = applications.length;

    const speciesCounts = pets.reduce((acc, pet) => {
        acc[pet.species] = (acc[pet.species] || 0) + 1;
        return acc;
    }, {});

    let approvedCount = 0;
    let pendingCount = 0;
    let unavailableCount = 0;

    applications.forEach((app) => {
        app.pets.forEach((pet) => {
            const status = pet.status || "pending";
            if (status === "approved") approvedCount++;
            else if (status === "pending") pendingCount++;
            else if (status === "pet_no_longer_available") unavailableCount++;
        });
    });

    const calculateDaysInShelter = (dateEntered) => {
        const entered = new Date(dateEntered);
        const today = new Date();
        const diffTime = Math.abs(today - entered);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const avgDaysInShelter =
        pets.length > 0
            ? Math.round(
                pets.reduce((sum, pet) => sum + calculateDaysInShelter(pet.date_entered), 0) /
                pets.length
            )
            : 0;

    const statusData = [
        { label: "Approved", count: approvedCount, color: "#28a745" },
        { label: "Pending", count: pendingCount, color: "#ffc107" },
        { label: "Unavailable", count: unavailableCount, color: "#dc3545" },
    ];

    const maxCount = Math.max(...statusData.map((d) => d.count), 1);

    // Get pet status information
    const getPetStatus = (petId) => {
        const applicationsForPet = [];
        applications.forEach((app) => {
            app.pets.forEach((pet) => {
                if (pet.id === petId) {
                    applicationsForPet.push({
                        applicant: app.applicant_name,
                        status: pet.status || "pending",
                    });
                }
            });
        });
        return applicationsForPet;
    };

    const handlePrint = () => window.print();

    const handleDownload = () => {
        const content = document.getElementById("reportContent");
        const html = `<!DOCTYPE html>
<html><head><title>Pet Shelter Report</title>
<style>body{font-family:Arial;padding:20px}h2,h3{color:#333}table{width:100%;border-collapse:collapse}th,td{padding:10px;text-align:left;border-bottom:1px solid #ddd}th{background:#007bff;color:white}</style>
</head><body>${content.innerHTML}</body></html>`;
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `report-${new Date().toISOString().split("T")[0]}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const StatCard = ({ value, label, bgColor, borderColor, textColor }) => (
        <div style={{ backgroundColor: bgColor, padding: "20px", borderRadius: "8px", textAlign: "center", border: `2px solid ${borderColor}` }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: textColor }}>{value}</div>
            <div style={{ fontSize: "14px", color: "#555", marginTop: "5px" }}>{label}</div>
        </div>
    );

    const renderContent = () => {
        if (selectedReport === "petStatus") {
            return (
                <div>
                    <h3>Current Status of All Pets</h3>
                    <p style={{ marginBottom: "20px", color: "#666" }}>
                        Shows each pet and their application status
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>Pet Name</th>
                                <th>Species</th>
                                <th>Age</th>
                                <th>Days in Shelter</th>
                                <th>Applications</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet, i) => {
                                const petApplications = getPetStatus(pet.id);
                                const hasApproved = petApplications.some((app) => app.status === "approved");
                                const hasPending = petApplications.some((app) => app.status === "pending");

                                return (
                                    <tr key={i}>
                                        <td>{pet.name}</td>
                                        <td>{pet.species}</td>
                                        <td>{pet.age}</td>
                                        <td>{calculateDaysInShelter(pet.date_entered)}</td>
                                        <td>{petApplications.length}</td>
                                        <td>
                                            {petApplications.length === 0 ? (
                                                <span style={{ color: "#999", fontStyle: "italic" }}>No applications</span>
                                            ) : hasApproved ? (
                                                <span style={{ color: "#28a745", fontWeight: "bold" }}>✓ Approved</span>
                                            ) : hasPending ? (
                                                <span style={{ color: "#ffc107", fontWeight: "bold" }}>⏳ Pending</span>
                                            ) : (
                                                <span style={{ color: "#dc3545" }}>Unavailable</span>
                                            )}
                                            {petApplications.length > 0 && (
                                                <div style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                                                    {petApplications.map((app, idx) => (
                                                        <div key={idx}>
                                                            {app.applicant} ({app.status})
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (selectedReport === "applications") {
            return (
                <div>
                    <h3>Applications Summary</h3>
                    <p><strong>Total:</strong> {totalApplications} | <strong>Approved:</strong> {approvedCount} | <strong>Pending:</strong> {pendingCount}</p>
                    <table>
                        <thead><tr><th>Applicant</th><th>Email</th><th>Phone</th><th>Pets</th></tr></thead>
                        <tbody>
                            {applications.map((app, i) => (
                                <tr key={i}>
                                    <td>{app.applicant_name}</td>
                                    <td>{app.email}</td>
                                    <td>{app.phone}</td>
                                    <td>{app.pets.map((p) => p.name).join(", ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (selectedReport === "pets") {
            return (
                <div>
                    <h3>Pets Inventory</h3>
                    <p><strong>Total Pets:</strong> {totalPets} | <strong>Avg Days in Shelter:</strong> {avgDaysInShelter}</p>
                    <table>
                        <thead><tr><th>Name</th><th>Species</th><th>Age</th><th>Days in Shelter</th></tr></thead>
                        <tbody>
                            {pets.map((pet, i) => (
                                <tr key={i}>
                                    <td>{pet.name}</td>
                                    <td>{pet.species}</td>
                                    <td>{pet.age}</td>
                                    <td>{calculateDaysInShelter(pet.date_entered)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (selectedReport === "status") {
            return (
                <div>
                    <h3>Status Breakdown</h3>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", height: "250px", marginTop: "30px" }}>
                        {statusData.map((item) => (
                            <div key={item.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                                <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>{item.count}</div>
                                <div style={{ width: "100%", backgroundColor: item.color, height: `${(item.count / maxCount) * 180}px`, minHeight: "30px", borderRadius: "8px 8px 0 0" }} />
                                <div style={{ marginTop: "15px", fontSize: "16px", fontWeight: "bold" }}>{item.label}</div>
                                <div style={{ fontSize: "14px", color: "#777", marginTop: "5px" }}>
                                    {approvedCount + pendingCount + unavailableCount > 0 ? Math.round((item.count / (approvedCount + pendingCount + unavailableCount)) * 100) : 0}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Overview (default)
        return (
            <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px", marginBottom: "30px" }}>
                    <StatCard value={totalPets} label="Total Pets Available" bgColor="#e3f2fd" borderColor="#2196f3" textColor="#1976d2" />
                    <StatCard value={totalApplications} label="Total Applications" bgColor="#fff3e0" borderColor="#ff9800" textColor="#f57c00" />
                    <StatCard value={approvedCount} label="Approved Applications" bgColor="#e8f5e9" borderColor="#4caf50" textColor="#388e3c" />
                    <StatCard value={avgDaysInShelter} label="Avg Days in Shelter" bgColor="#fce4ec" borderColor="#e91e63" textColor="#c2185b" />
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <h3>Pets by Species</h3>
                    <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                        {Object.entries(speciesCounts).map(([species, count]) => (
                            <div key={species} style={{ backgroundColor: "#f5f5f5", padding: "10px 20px", borderRadius: "20px", border: "1px solid #ddd" }}>
                                <strong>{species}:</strong> {count}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3>Application Status Breakdown</h3>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", height: "200px" }}>
                        {statusData.map((item) => (
                            <div key={item.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                                <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{item.count}</div>
                                <div style={{ width: "100%", backgroundColor: item.color, height: `${(item.count / maxCount) * 150}px`, minHeight: "20px", borderRadius: "8px 8px 0 0" }} />
                                <div style={{ marginTop: "10px", fontSize: "14px", fontWeight: "bold", color: "#555" }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }} className="no-print">
            <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)", maxWidth: "900px", width: "90%", maxHeight: "90vh", overflowY: "auto" }} id="reportContent">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                    <h2 style={{ margin: 0, color: "#333", fontSize: "28px" }}>Pet Shelter Reports</h2>
                    <select value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)} style={{ padding: "8px 16px", fontSize: "16px", borderRadius: "6px", border: "2px solid #2196f3", cursor: "pointer" }} className="no-print">
                        <option value="overview">Overview Report</option>
                        <option value="petStatus">Pet Status Report</option>
                        <option value="applications">Applications Report</option>
                        <option value="pets">Pets Inventory Report</option>
                        <option value="status">Status Breakdown Report</option>
                    </select>
                </div>

                {renderContent()}

                <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "30px" }} className="no-print">
                    <button onClick={handleDownload} style={{ backgroundColor: "#4caf50", color: "white", border: "none", padding: "12px 30px", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
                        Download Report
                    </button>
                    <button onClick={handlePrint} style={{ backgroundColor: "#2196f3", color: "white", border: "none", padding: "12px 30px", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
                        Print Report
                    </button>
                    <button onClick={onClose} style={{ backgroundColor: "#757575", color: "white", border: "none", padding: "12px 30px", borderRadius: "6px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
                        Close
                    </button>
                </div>
            </div>

            <style>
                {`@media print { .no-print { display: none !important; } #reportContent { position: static !important; box-shadow: none !important; max-width: 100% !important; max-height: none !important; } }`}
            </style>
        </div>
    );
};

export default Reports;
