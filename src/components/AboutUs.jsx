import aboutImage from "../assets/about_us_1.jpeg";

const AboutUs = () => {
  return (
    <div className="aboutus">
      <h2 style={{ fontSize: "42px", fontWeight: "bold" }}>About Us</h2>
      <div className="row">
        <div className="col-left">
          <img
            src={aboutImage}
            alt="Our team"
            style={{ width: "auto", height: "800px", border: "3px solid #333", borderRadius: "8px" }}
          />
        </div>
        <div className="col-right">
          <p style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#444",
            textAlign: "justify",
            marginBottom: "30px",
            maxWidth: "450px"
          }}>
            Our team at Shelly's Pet Shelter is dedicated to rescuing and
            rehabilitating pets in need. We are a group of passionate
            individuals who work together to ensure every animal receives the
            care and love they deserve. With hundreds of pets entering our
            shelter each year, we are dedicated to treating each animal as an
            individual and providing the highest quality of care. We offer a
            variety of community support programs to help pets stay with their
            families. We are proud to be part of a diverse and vibrant community
            that includes a highly skilled and dedicated staff, a committed team
            of volunteers and fosters, and compassionate residents.
          </p>
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "25px",
            borderRadius: "10px",
            border: "2px solid #dee2e6",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{
              color: "#2196f3",
              marginBottom: "20px",
              fontSize: "24px",
              borderBottom: "2px solid #2196f3",
              paddingBottom: "10px"
            }}>Contact Information</h3>
            <p style={{ fontSize: "16px", marginBottom: "12px", color: "#555" }}>
              <strong style={{ color: "#333", fontSize: "17px" }}>📍 Location:</strong> 1234 Pet Lane, Happy Town, HT 56789
            </p>
            <p style={{ fontSize: "16px", marginBottom: "0", color: "#555" }}>
              <strong style={{ color: "#333", fontSize: "17px" }}>📞 Phone:</strong> (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
