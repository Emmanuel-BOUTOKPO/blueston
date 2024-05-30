import React from 'react'
import { BsEnvelope, BsPhone } from 'react-icons/bs'
import {FaSearchLocation} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Les liens utiles</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <Link to="/">Accueil</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/about">A propos</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/schedule">Programme</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/realization">Réalisation</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Nos Services</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <Link>Santé</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link>Charité</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link>Education</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link>Communication</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link>Divertissement</Link></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Contactez-nous</h4>
              <div>
              <div className="address_text">
                <FaSearchLocation />
                  <span className="padding_left_15">Cotonou, Bénin</span>
                 
                  </div>
               <div className="address_text">
                <a href="mailto:bluestonbenin@gmail.com">
                 <BsEnvelope />  
                 <span className="padding_left_15">
                        bluestonbenin@gmail.com
                    </span>
                  </a>
                </div>
                <div className="address_text">
                  <a href="tel:+22999760909">
                <BsPhone />
                      <span className="padding_left_15">
                        +229 99760909
                        </span>
                      </a>
                    </div>
              
              </div>

            </div>
            <div className="col-lg-3 col-md-6 footer-info">
              <h3>Suivez-nous</h3>
              <p>Suivez-nous sur nos reseaux sociaux</p>
              <div className="social-links mt-3">
                <a href="a" className="twitter"><i className="bx bxl-twitter"></i></a>
                <a href="a" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="a" className="instagram"><i className="bx bxl-instagram"></i></a>
                <a href="a" className="google-plus"><i className="bx bxl-skype"></i></a>
                <a href="a" className="linkedin"><i className="bx bxl-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>   
  )
}

export default Footer
