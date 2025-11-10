import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const title = "Shelly's Pet Shelter";
  return (
    <div className="header">
      <div className="header-title">
        <img id="logo" src={logo} alt="Company Logo" />
        <h1>{title}</h1><img id="logo" src={logo} alt="Company Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/pets">Pets</Link>
          </li>
          <li>
            <Link to="/adopt">Adopt</Link>
          </li>
          <li>
            <Link to="/applications">Applications</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
