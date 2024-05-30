import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './crew.css'
import BackTop from "../../components/backToTop/BackTop";
import Navbar from "../../components/navbars/Navbar";
import Footer from "../../components/footer/Footer";
import { createCrews, getAllCrews, updatedCrew } from "../../redux/features/crew/crewSlice";

const Crew = () => {
    const state = useLocation().state;
    const [firstname, setFirstname] = useState(state?.firstname|| "");
    const [lastname, setLastname] = useState(state?.lastname || "");
    const [poste, setPoste] = useState(state?.poste || "");
    const [picture, setPicture] = useState(state?.picture || "");
    const [social, setSocial] = useState(state?.social || "");
    const [link, setLink] = useState(state?.link || "");
  
    const [imgPostPreview, setImgPostPreview] = useState(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    //------------------------  Create and edit Post ------------------------
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
        const formData = new FormData();
         
        if (!firstname || !lastname || !poste || !picture || !social || !link) {
          toast.error("Veuillez renseigner le champs !");
        } else if (!state) {
          formData.append("firstname", firstname);
          formData.append("lastname", lastname);
          formData.append("poste", poste);
          formData.append("picture", picture);
          formData.append("social", social);
          formData.append("link", link);
         
          dispatch(createCrews(formData));
          toast.success("Votre équipe a été créé avec succès !");
          navigate("/about");
        } else {
          let id = state.id;
          dispatch(updatedCrew({ id, firstname, lastname, poste, picture, social, link}));
          toast.success("Votre équipe a été modifié avec succès !");
          navigate("/about");
        }
         dispatch(getAllCrews());
      
    };
  
    // Handle image preview for single image
    const handleSingleImageChange = (e) => {
      const file = e.target.files[0];
      setPicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPostPreview(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    //----------------------------Render ------------------------------------------
  
    return (
      <>
        <Navbar />
        <section id="breadcrumbs" style={{marginBottom : '6rem'}} className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to='/' className="animate__fadeInUpe">Accueil</Link></li>
              <li><Link  to='/post' className="animate__fadeInUpe">Equipe</Link></li>
            </ol>
            <h2>{state?"Modifier" : "Ajouter"} une équipe</h2>
          </div>
        </section>
        <div className="container">
            
          <div className="row">
            <form className="adds" onSubmit={handleSubmit}>
              <div className="col-md-6">
               <div>
                <input
                  type="texts"
                  placeholder="Prenom"
                  className="texts"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
                 </div>
                 <div>
                <input
                  type="text"
                  placeholder="Nom"
                  className="texts"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="La position dans l'équipe"
                  className="texts"
                  value={poste}
                  onChange={(e) => {
                    setPoste(e.target.value);
                  }}
                />
               </div>
             </div>
             <div className="col-md-6">
                <div>
                    <input
                      type="text"
                      value={social}
                      className="readTimes"
                      placeholder="Reseau social"
                      onChange={(e) => setSocial(e.target.value)}
                    />
                </div>
                <div>
                    <input
                      type="text"
                      value={link}
                      placeholder="Lien de votre reseau social"
                      className="lieux"
                      onChange={(e) => setLink(e.target.value)}
                    />
             </div>
             <div>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                    onChange={handleSingleImageChange}
                  />
                  <label className="file" htmlFor="file">
                    Uploader une image principale
                  </label>
             </div>
                  {imgPostPreview && (
                    <div className="imgPreview">
                      <img src={imgPostPreview} alt="primaryImg" style={{width : '25%'}}/>
                    </div>
                  )}
                  </div>

                  <div className="button">
                    <button className="button2" type="submit">
                      {state ? "Modifier" : "Ajouter"}
                    </button>
                  </div>
            </form>
          </div>
        </div>
        <BackTop />
        <Footer />
      </>
    );
}

export default Crew
