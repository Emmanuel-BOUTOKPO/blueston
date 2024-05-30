import React from 'react'
import './shopBanner.css'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const ShopBanner = () => {
  return (
     <div className='container-fluid space'>
     <div className="row rows">
     <Carousel fade={true} controls={false}>
     <Carousel.Item>
         <Carousel.Caption>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-md-6 carousels">
                   <p className="carouPar">
                     Souhaitez-vous d'être au courant des informations qui circulent à travers le monde? vous êtes dans le bon endroit !
                   </p> 
                    <Link to="/shop/Univers" className='ebook'>Voir les informations</Link>
                  </div>
               </div>
            </div>
         </Carousel.Caption>
       <div> 
       </div>
     </Carousel.Item>
     <Carousel.Item>
       <Carousel.Caption>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-md-6 carousels">
                    <p className="carouPar">
                       Êtes-vous fatigué de la lecture? il y a des livres audio pour vous! Vous y trouverez également de toutes genres de livres audios.
                    </p> 
                    <Link to="/shop/Livre Audio" className='ebook'>Voir nos Livres audio</Link>
                  </div>
               </div>
            </div>
         </Carousel.Caption>
     </Carousel.Item>   
   </Carousel> 
     </div>
   </div>
  )
}

export default ShopBanner
