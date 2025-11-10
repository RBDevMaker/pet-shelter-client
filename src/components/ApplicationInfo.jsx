import { useLocation } from "react-router-dom";

function getImgUrl(fileName) {
  // let ext = '.jpg' // can be anything
  const imgUrl = new URL(`../assets/${fileName}`, import.meta.url).href;
  return imgUrl;
}

const formatDate = (dateString) => dateString.split("T")[0];

const ApplicationInfo = () => {
  const location = useLocation();
  const { applicationData } = location.state || {};

  if (!applicationData) {
    return <div>No application data available.</div>;
  }

  return (
    <div>
      <h1>Application Information</h1>
      <p>
        <strong>Applicant Name:</strong> {applicationData.item.applicant_name}
      </p>
      <p>
        <strong>Email:</strong> {applicationData.item.email}
      </p>
      <p>
        <strong>Phone:</strong> {applicationData.item.phone}
      </p>
      <p>
        <strong>Pet ID:</strong> {applicationData.item.pet_id}
      </p>
      <p>
        <strong>Pet Name:</strong> {applicationData.item.pet_name}
      </p>
      <p>
        <strong>Pet Image:</strong>{" "}
        <img
          src={getImgUrl(applicationData.item.pet_image)}
          alt={applicationData.item.pet_name} /*style={{ width: '100%' }}*/
        />
      </p>
      <p>
        <strong>Species:</strong> {applicationData.item.species}
      </p>
      <p>
        <strong>Submitted At:</strong>{" "}
        {formatDate(applicationData.item.submitted_at)}
      </p>
    </div>
  );
};

export default ApplicationInfo;
