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
    <div className="form-container">
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
  );
}

