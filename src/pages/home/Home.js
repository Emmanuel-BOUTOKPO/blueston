import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbars/Navbar'
import Footer from '../../components/footer/Footer'
import BackTop from '../../components/backToTop/BackTop'
import Banner from '../../banner/banners/Banner'
import './home.css'
import { FaCalendar, FaLocationArrow } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Carousel from "react-multi-carousel";
import Don from '../../components/don/Don'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../redux/features/post/postSlice'
import ZeroProduct from '../../components/notFound/ZeroProduct'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import DOMPurify from 'dompurify';

const Home = () => {
  const posts = useSelector(state => state.post.post);
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "d MMMM yyyy", { locale: fr })
  }

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
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])

  useEffect(() => {
    if (posts) {
      setAllPosts(posts)
    } else {
      setAllPosts([])
    }
  }, [posts]);


  const getText = (html) => {
    const cleanedHtml = DOMPurify.sanitize(html);
    const doc = new DOMParser().parseFromString(cleanedHtml, "text/html");
    return doc.body.textContent.substring(0, 80) + '...';
  };


  return (
    <>
      <Navbar />
      <Banner />
      <main id="main">

        <section id="featured" className="featured">
          <div className="container">
            <div className="row">
              <div className="section-title">
                <h2>Notre plan d'action </h2>
              </div>

              <div className="col-lg-4">
                <Link to={`/shop/Santé`} className="icon-box">
                  <i className="bi bi-heart" />
                  <h3>Santé</h3>
                  <p>Mettre en place un système pour renforcer les soins de santé universels et universellement accessible à tous, peu importe la situation financière. </p>
                </Link>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <Link to={`/shop/Charité`} className="icon-box">
                  <i className="bi bi-bag" />
                  <h3>Charité</h3>
                  <p>Venir en aide aux personnes en situation d'extrême vulnérabilité. Mobiliser des ressources afin d'aider les personnes dans le besoin et d'encourager la générosité.</p>
                </Link>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <Link to={`/shop/Education`} className="icon-box">
                  <i className="bi bi-book" />
                  <h3>Éducation</h3>
                  <p>Assurer à toute une éducation équitable, de qualité et des possibilités d'apprentissage tout au long de la vie. Contribuer à l'amélioration de l'environnement scolaire tout en stimulant l'excellence.</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="counts" className="counts">
          <div className="container">
            <div className="section-title">
              <h2> Nos réalisations </h2>
            </div>
            {
              allPosts.length > 0 ? Object.entries(allPosts[0]).slice(0, 1).map(([category, postes]) => (

                <div className="row no-gutters" key={category}>
                  <div className="display-header">
                    {postes.length > 0 && <h1>{category}</h1>}
                    {postes.length > 0 && <Link to={`/shop/${category}`}>Voir tout</Link>}
                  </div>
                  {postes.length > 0 ? postes.slice(0, 3).map((post, id) => (
                    <div key={id} className="col-lg-3 col-md-4  mb-4 d-md-flex align-items-md-stretch">
                      <div className="counts-box">
                        <div className="viser">
                          <img src={post.imgprod} className="img-fluid" alt="img" />
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

                  )) : <ZeroProduct />
                  }

                </div>
              )) : <ZeroProduct />
            }
            <div className="btn-box">
              <Link to='/realization'>
                Voir plus
              </Link>
            </div>
          </div>

        </section>

        <section id="featured" className="featured">
          <div className="container">
            <div className="row">
              <div className="section-title">
                <h2>Nous travaillons aussi dans : </h2>
              </div>

              <div className="col-lg-4 mb-4 mt-lg-4">
                <Link to={`/shop/Energie`} className="icon-box">
                  <i className="bi bi-lightbulb-fill" />
                  <h3>Energie</h3>
                  <p>Produire de l'énergie électrique grâce aux matières
                    fécaux domestiques pour faciliter l'accès au courant.
                    Adopter le transport écologique pour éviter les gaz
                    déchappement, qui causent la contamination de l'air, en
                    particulier dans les zones urbaines bouchées.</p>
                </Link>
              </div>
              <div className="col-lg-4 mb-4 mt-lg-4">
                <Link to={`/shop/Reclyclage`} className="icon-box">
                  <i className="bi bi-tools" />
                  <h3>Recyclage</h3>
                  <p>
                    Sensibiliser tout le monde, y compris les individus,
                    les entreprises, les écoles, les infrastructures, etc...
                    à tout recycler en leur offrant nos poubelles de
                    recyclage. S'attaquer à la crise des déchets
                    plastiques sous tous ses angles, en mettant au point
                    des solutions innovantes pour collecter et traiter les
                    déchets complexes ou difficiles à recycler en les
                    intégrant dans une nouvelle production.
                  </p>
                </Link>
              </div>
              <div className="col-lg-4 mb-4 mt-lg-4">
                <Link to={`/shop/Communication`} className="icon-box">
                  <i className="bi bi-bullseye" />
                  <h3>Communication</h3>
                  <p>
                    Mettre la main d'œuvre des artisans béninois au profit
                    de la population via notre plateforme de réseautage
                    pour réserver leurs différents services sans se déplacer.
                  </p>
                </Link>
              </div>
            </div>
          </div>

        </section>

        <section id="testimonials" className="testimonials">
          <div className="container">
            <div className="section-title">
              <h2>Temoignage</h2>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="testimonial-item">
                  <img src="assets/img/team/team-1.jpg" className="testimonial-img" alt="img" />
                  <h3>Saul Goodman</h3>
                  <h4>Ceo &amp; Founder</h4>
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    Collaborer avec Blue'ston a été un tournant majeur pour notre entreprise. Leur équipe exceptionnelle a pris nos idées et les a transformées en une réalité impressionnante. Chaque défi a été relevé avec expertise, et le résultat final a dépassé toutes nos attentes. Blue'ston n'est pas seulement un partenaire, mais un catalyseur de réussite
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="testimonial-item mt-4 mt-lg-0">
                  <img src="assets/img/team/team-2.jpg" className="testimonial-img" alt="img" />
                  <h3>Sara Wilsson</h3>
                  <h4>Designer</h4>
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    "Notre partenariat avec Blue'ston va bien au-delà des contrats. Ils ont démontré un engagement inébranlable envers notre succès, chaque étape du chemin. Leur équipe dédiée et leur expertise ont été les fondements de notre croissance continue. Avec Blue'ston, nous avons trouvé un partenaire pour l'avenir
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="testimonial-item mt-4 mt-lg-0">
                  <img src="assets/img/team/team-3.jpg" className="testimonial-img" alt="img" />
                  <h3>Matt Brandon</h3>
                  <h4>Freelancer</h4>
                  <p>
                    <i className="bx bxs-quote-alt-left quote-icon-left" />
                    Blue'ston représente l'excellence opérationnelle. Leur approche méthodique, associée à une compréhension approfondie de nos besoins, a donné naissance à des résultats exceptionnels. Chaque défi a été relevé avec une précision remarquable, et nous sommes reconnaissants d'avoir Blue'ston comme partenaire stratégique.
                    <i className="bx bxs-quote-alt-right quote-icon-right" />
                  </p>
                </div>
              </div>

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
      <BackTop />
      <Don />

    </>
  )
}

export default Home
