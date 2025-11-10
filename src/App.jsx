import { useEffect, useState } from "react";
import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Pets from "./components/Pets";
import AdoptionForm from "./components/AdoptionForm";
import Footer from "./components/Footer";
import Applications from "./components/Applications";
import ApplicationDetail from "./components/ApplicationDetail"; 
import axios from "axios"

function App() {
  const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
  const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;
  const [pets, setPets] = useState([]);

  useEffect(()=>{
    // get pets from api
    axios.get(`${API_GATEWAY_BASE_URL}/pets`)
      .then(res => {
        console.log(res.data);
        setPets(res.data.pets);
      })
      .catch(err => console.log(err))
  },[])

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pets" element={<Pets pets={pets}/>} />
          <Route path="/adopt" element={<AdoptionForm pets={pets}/>} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:id" element={<ApplicationDetail/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;