 import React from 'react'
import './banner.css'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
const Banner = () => {
  return (
     
    <Carousel fade={true} controls={false}>
    <Carousel.Item>
      
        <Carousel.Caption>
          <h2 className="animate__animated fanimate__adeInDown">Bienvenu dans l'entreprise <span>BLUE'STON</span></h2>
             <p className="animate__animated animate__fadeInUp" id='vf'>Une entrprise axé dans la communication, le développement de l'énergie, l'éducation et le divertissement.</p>
             <Link to='/about' className="btn-get-starte">Voir plus</Link>
        </Carousel.Caption>
      <div>
       
      </div>
    </Carousel.Item>
     
  <Carousel.Item>
   
      <Carousel.Caption>
          <h2 className="animate__animated fanimate__adeInDown">L'entreprise <span>BLUE'STON</span></h2>
                <p className="animate__animated animate__fadeInUp"id='vf'>Nous innovons pour offrir dess expériences ludique, améliorer les communications, <br /> développer des solutions énergétiques durables et enrichir l'éducation.</p>
                <Link to='/about' className="btn-get-starte">Voir plus</Link>     
        </Carousel.Caption>
    
    </Carousel.Item>    
  </Carousel>
  
  
  )
}

export default Banner  