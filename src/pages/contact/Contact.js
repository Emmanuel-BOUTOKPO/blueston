import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbars/Navbar'
import { Link } from 'react-router-dom'
import Don from '../../components/don/Don'
import BackTop from '../../components/backToTop/BackTop'

const Contact = () => {
  return (
    <>
        <Navbar />
  <main id="main">
    
  <section id="breadcrumbs" className="breadcrumbs">
    <div className="container">
      <ol>
        <li><Link to='/' className="animate__fadeInUpe">Accueil</Link></li>
        <li>Contact</li>
      </ol>
      <h2>Contact</h2>
    </div>
  </section> 
    <section id="contact" className="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="info-box mb-4">
              <i className="bx bx-map" />
              <h3>Notre Adresse</h3>
              <p>Cotonou, Bénin</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="info-box  mb-4">
              <i className="bx bx-envelope" />
              <h3>Email</h3>
              <p>bluestonbenin@gmail.com</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="info-box  mb-4">
              <i className="bx bx-phone-call" />
              <h3>Téléphone</h3>
              <p>+229 99760909</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 ">
            <iframe className="mb-4 mb-lg-0" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameBorder={0} style={{border: 0, width: '100%', height: 384}} allowFullScreen />
          </div>
          <div className="col-lg-6">
            <form action="" className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Nom  et prenom" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Email" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Objet du message" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows={5} placeholder="Message" required defaultValue={""} />
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message" />
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Envoyer</button></div>
            </form>
          </div>
        </div>
      </div>
    </section> 
  </main>
  <Footer />
  <BackTop/>
     <Don />
</>

  )
}

export default Contact
