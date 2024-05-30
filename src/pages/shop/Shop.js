import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom'

import "./shop.css"
import { getPostsByCat } from '../../redux/features/post/postSlice'
import ZeroProduct from '../../components/notFound/ZeroProduct'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import Navbar from '../../components/navbars/Navbar';
import Footer from '../../components/footer/Footer';
import BackTop from '../../components/backToTop/BackTop';
import { FaCalendar, FaLocationArrow } from 'react-icons/fa';
import DOMPurify from 'dompurify';

const Shop = () => {
  const catPosts = useSelector(state => state.post.catPost); 
  const dispatch = useDispatch();
  const [allCatPosts, setAllCatPosts] = useState();
  const { category } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "d MMMM yyyy", { locale: fr })
  }

  useEffect(() => {
    dispatch(getPostsByCat(category));
}, [dispatch])

useEffect(() => {
    if (catPosts) {
      setAllCatPosts(catPosts)
    } else {
      setAllCatPosts([])
    }
}, [catPosts]);

const getText = (html) => {
  const cleanedHtml = DOMPurify.sanitize(html);
  const doc = new DOMParser().parseFromString(cleanedHtml, "text/html");
  return doc.body.textContent.substring(0, 80) + '...' ;
};


  const [range, setRange] = useState([5, 1000]);
  const [currentPage, setCurrentPage] = useState(0);
  //const [availableOnly, setAvailableOnly] = useState(false);

  const groupsPerPage = 2;
  const startIndex = currentPage * groupsPerPage;
  const endIndex = startIndex + groupsPerPage;


  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

 const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

  return (
   <>
   <Navbar />
   <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to='/' className="animate__fadeInUpe">Accueil</Link></li>
            <li><Link  to='/realization' className="animate__fadeInUpe">réalisation</Link></li>
          </ol>
          <h4>{category}</h4>
        </div>
      </section>
   <div className="container sidebar_section">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12">     
            <div className="row no-gutters">
          {
            ((allCatPosts !== undefined && allCatPosts.length > 0))?allCatPosts.map((post,id) => (         
              <div key={id} className="col-lg-3 col-md-4  mb-4 d-md-flex align-items-md-stretch">
              <div className="counts-box">
               <div className="viser">
                 <img src={post.imgprod} className="img-fluid" alt="img"/>      
               </div>
               <div className="vise">
               <div className="viset">
                 <div className="viset">
                   <FaLocationArrow />
                   <span>{post.place}</span> 
                 </div>
                 <div className="viset">
                   <FaCalendar />
                   <span>{formatDate(post.eventdate)}</span> 
                 </div>
               </div>
               <span className="purecounter" />
               <h4>{post.title}</h4>
               <div dangerouslySetInnerHTML={{ __html: getText(post.description) }} />
                <Link to={`/detail/${post.id}`} className="animate__fadeInUpe">Consulter la page »</Link>
                      
               </div>
              </div>
                 </div>
))  : <ZeroProduct />
}    
    </div>
          </div> 
         { 
         
         (allCatPosts !== undefined && allCatPosts.length > 0) && <ReactPaginate
           previousLinkClassName={"prevPag"}
           nextLinkClassName={"prevPag"}
           previousLabel={'<'}
           nextLabel={'>'}
           breakLabel={'...'}
           pageCount={Math.ceil(allCatPosts ?allCatPosts.length / groupsPerPage : 0)}
           onPageChange={handlePageChange}
           containerClassName={'pagination'}
           activeClassName={'active'}
      />}
        </div>
      </div>
   <Footer />
  <BackTop />

 
</>

  )
}

export default Shop