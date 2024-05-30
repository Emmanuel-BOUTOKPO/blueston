import React from 'react'

const CatBanners = ({category, imgBanner}) => {
  return (
     <div className="banner">
     <div className="banner-desc">
       <h1 className="text-thin"><strong>{category}</strong></h1>
     </div>
     <div className="banner-img">
     <img src={imgBanner} alt="banner" />
     </div>
   </div>
  )
}

export default CatBanners
