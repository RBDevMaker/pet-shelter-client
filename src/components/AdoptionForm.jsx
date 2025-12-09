import { useState } from "react";

export default function AdoptionForm({ pets }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pet: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "pet") {
      setFormData({ ...formData, [name]: JSON.parse(value) });
      return;
    }

    // Format phone number as (123)456-7890
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;
      if (cleaned.length >= 6) {
        formatted = `(${cleaned.slice(0, 3)})${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      } else if (cleaned.length >= 3) {
        formatted = `(${cleaned.slice(0, 3)})${cleaned.slice(3)}`;
      } else if (cleaned.length > 0) {
        formatted = `(${cleaned}`;
      }
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const errors = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    //create a new object from formData that has the following properties: applicant_name, email, pet_id, pet_image, pet_name, phone, species
    /*const newApplication = {
      applicant_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      pet_id: formData.pet.id,
      pet_image: formData.pet.image,
      pet_name: formData.pet.name,
      species: formData.pet.species,
    };*/
    console.log("Not implemented yet");
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "10px 20px 5px" }}>
        <h2 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "10px" }}>Adopt Me</h2>
      </div>
      <div style={{ display: "flex", gap: "60px", padding: "10px 80px", justifyContent: "center", alignItems: "flex-start", maxWidth: "2000px", margin: "0 auto" }}>
        {/* Left Side Info */}
        <div style={{ flex: "1", minWidth: "250px", backgroundColor: "#e3f2fd", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#2196f3", marginBottom: "15px" }}>Adoption Process</h3>
          <ul style={{ textAlign: "left", lineHeight: "1.8", color: "#555" }}>
            <li>Fill out the application form</li>
            <li>Our team will review your application</li>
            <li>Schedule a meet & greet with your pet</li>
            <li>Complete the adoption paperwork</li>
            <li>Take your new friend home!</li>
          </ul>
        </div>

        {/* Form Container */}
        <div className="form-container" style={{ flex: "2", minWidth: "400px" }}>
          <form className="form" onSubmit={handleSubmit}>
            {errors ? <div className="error">{JSON.stringify(errors)}</div> : null}
            <div className="form-group">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Your Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123)456-7890"
                pattern="\([0-9]{3}\)[0-9]{3}-[0-9]{4}"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="petId">Select a Pet:</label>
              <select
                id="pet"
                name="pet"
                // value={formData.petId}
                onChange={handleChange}
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a pet
                </option>
                {pets.map((pet) => (
                  <option key={pet.id} value={JSON.stringify(pet)}>
                    {pet.name} (ID: {pet.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>

        {/* Right Side Info */}
        <div style={{ flex: "1", minWidth: "250px", backgroundColor: "#e8f5e9", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#4caf50", marginBottom: "15px" }}>What You'll Need</h3>
          <ul style={{ textAlign: "left", lineHeight: "1.8", color: "#555" }}>
            <li>Valid ID or driver's license</li>
            <li>Proof of residence</li>
            <li>Landlord approval (if renting)</li>
            <li>Veterinary references</li>
            <li>Adoption fee payment</li>
            <li>Leash and collar</li>
            <li>Kennel or crate</li>
            <li>A loving home ❤️</li>
          </ul>
        </div>
      </div>
    </>
  );
}

