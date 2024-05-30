import  React ,{ useState, useEffect } from 'react';
import "./don.css"

const Don = () => {
    const [backToTop, setBackToTop] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 100) {
                setBackToTop(true);
            }else{
                setBackToTop(false)
            }
        })
    }, []);
    
  return (
    <div>
      {backToTop && (
           <a className='styles' href="https://wa.me/+79944264521">
             <img src="assets/Gmail/don.jpg" style={{borderRadius : "50%"}} className="img-fluid" alt="img" />
        </a>
 
      )}
    </div>
  )
}

export default Don
