import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbars/Navbar'
import Footer from '../../components/footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import BackTop from '../../components/backToTop/BackTop';
import Don from '../../components/don/Don';
import { FaEdit, FaTrash } from "react-icons/fa";
import './about.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCrews, getAllCrews } from '../../redux/features/crew/crewSlice';
import { ImSad } from 'react-icons/im';

const About = () => {
  const crews = useSelector(state => state.crew.crew); 
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCrews());
}, [dispatch])

useEffect(() => {
    if (crews) {
      setAllPosts(crews)
    } else {
        setAllPosts([])
    }
}, [crews]);

const handleDelete = (id) => {
  const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce membre ?");
  if (confirmDelete) {
    dispatch(deleteCrews(id));
    navigate('/crew');
  }
};

 const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
     <>
       <Navbar /> 
      <main id="main">
  <section id="breadcrumbs" className="breadcrumbs">
    <div className="container">
      <ol>
        <li><Link to='/' className="animate__fadeInUpe">Accueil</Link></li>
        <li>A propos</li>
      </ol>
      <h2>A propos</h2>
    </div>
  </section>
  <section id="about" className="about">
    <div className="container">
    <div className="section-title">
    <h2>BLUE'STON, une entreprise de référence </h2>
   </div>
      <div className="row">
        <div className="col-lg-6">
          <img src="assets/Gmail/img-1.jpg" className="img-fluid" alt="img" />
        </div>
        <div className="col-lg-6 pt-4 pt-lg-0 content">
          <p className="fst-italic">
          Notre entreprise est spécialisée dans le domaine de la communication, du développement de l'énergie et de l'éducation. Nous sommes une équipe dynamique et créative, dédiée à repousser 
          les frontières de l'innovation dans trois secteurs clés. 
          Notre mission est d'apporter des solutions novatrices, divertissantes et
           éducatives tout en contribuant activement à un avenir plus durable dans :
          </p>
          <ul>
            <li><i className="bi bi-check-circle" />La santé</li>
            <li><i className="bi bi-check-circle" /> La charité</li>
            <li><i className="bi bi-check-circle" /> L'éducation</li>
          </ul>
          <p>
            Mettre en place un système pour renforcer les soins de santé universels
           et universellement accessible à tous, peu importe la situation financière.<br /> 
           Venir en aide aux personnes en situation d'extrême vulnérabilité. <br />
           Assurer à toute une éducation équitable, de qualité et des possibilités d'apprentissage tout au long de la vie.
           </p>
        </div>
      </div>
    </div>
  </section> 
 <section id="team" className="team">
  <div className="container">
  <div className="section-title">
    <h2> Notre Equipe</h2>
   </div>
    <div className="row">
      {
         allPosts.length > 0? allPosts.map((allPost, id) =>(
          <div className="col-lg-3" key={id}>
            <div className="member">
              <img src={allPost.picture} alt="img" />
              <h4>{allPost.firstname} {allPost.lastname}</h4>
              <span>{allPost.poste}</span>
             <div className='dis'>
              <Link className="btn" to={`/crew?edit=${allPost.id}`} state={allPost} >
                 <FaEdit />
              </Link>
              <button className='action'  onClick={handleDelete(allPost.id)}> 
                 <FaTrash />
              </button> 
          </div>  
        </div>
          </div>
         )) : (<div id="zero-product-container">
              <h4>Veuillez ajouter un nouveau membre</h4>
              <ImSad id="sad-icon" />
             </div>)
    }
     
    </div>
  </div>
</section>
<section id="clients" className="clients">
  <div className="container">
    <div className="section-title">
      <h2>Sponsors</h2>
    </div>
    <Carousel 
    responsive={responsive}
    showDots={true}
    draggable={true}
    swipeable={false}
    arrows={false}
    >
  <div>
    <img src="assets/Gmail/logo_itel.jpg" className="testimonia" alt="img" /> 
  </div>
  <div>
  <img src="assets/Gmail/wegalspace.jpg" className="testimonia" alt="img" />
  </div>
  <div>
  <img src="assets/Gmail/download.jpg" className="testimonia" alt="img" />
  </div>
  <div>
  <img src="assets/Gmail/Moov_Africa_logo.png" className="testimonia" alt="img" />
  </div>
</Carousel>
  </div>
</section>
</main>
<Footer /> 
<BackTop/>
     <Don />
     </>
  )
}

export default About