import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbars/Navbar';
import Footer from '../../components/footer/Footer';
import BackTop from '../../components/backToTop/BackTop';
import { FaCalendar, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import Don from '../../components/don/Don';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/features/post/postSlice';
import ZeroProduct from '../../components/notFound/ZeroProduct';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactPaginate from 'react-paginate';
import DOMPurify from 'dompurify';

const Realisation = () => {
  const catPosts = useSelector(state => state.post.post);
  const dispatch = useDispatch();
  const [allCatPosts, setAllCatPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const groupsPerPage = 2;
  const startIndex = currentPage * groupsPerPage;
  const endIndex = startIndex + groupsPerPage;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (catPosts) {
      setAllCatPosts(catPosts);
    } else {
      setAllCatPosts([]);
    }
  }, [catPosts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: fr });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getText = (html) => {
    const cleanedHtml = DOMPurify.sanitize(html);
    const doc = new DOMParser().parseFromString(cleanedHtml, "text/html");
    return doc.body.textContent.substring(0, 80) + '...';
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
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to='/' className="animate__fadeInUpe">Accueil</Link></li>
            <li>réalisation</li>
          </ol>
          <h2>réalisation</h2>
        </div>
      </section>
      <div className="container sidebar_section">
        <div className="row">
      
          <div className="col-xl-12 col-lg-12 col-md-12">
            {allCatPosts.length > 0 ? Object.entries(allCatPosts[0]).slice(startIndex, endIndex).map(([category, posts]) => {
  
              return (
                <div className="row no-gutters" key={category}>
                  <div className="display-header">
                    <h4>{category}</h4>
                    {posts.length > 0 && <Link to={`/shop/${category}`}>Voir tout</Link>}
                  </div>
                  {posts.length > 0 ? posts.slice(0, 3).map((post, id) => (
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
                  )) : <ZeroProduct />}
                </div>
              );
            }) : <ZeroProduct />
            
            }
          { 
          allCatPosts.length > 0 && <ReactPaginate
              previousLinkClassName={"prevPag"}
              nextLinkClassName={"prevPag"}
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              pageCount={Math.ceil(allCatPosts.length > 0 && Object.entries(allCatPosts[0]) ? Object.entries(allCatPosts[0]).length / groupsPerPage : 0)}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          }
          </div>
        </div>
      </div>
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
      <Footer />
      <BackTop />
      <Don />
    </>
  );
}

export default Realisation;
