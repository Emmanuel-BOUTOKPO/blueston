import React, { useEffect, useState } from 'react';
import './detail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbars/Navbar';
import BackTop from '../../components/backToTop/BackTop';
import { getPosts, deletePosts } from '../../redux/features/post/postSlice';
import { FaEdit, FaTrash, FaComment } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { createComment, deleteComments, getAllComments, getComments, updateComment } from '../../redux/features/comment/commentSlice';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const getUserId = JSON.parse(localStorage.getItem("users"));
  const productDetails = useSelector(state => state.post.singlePost);
  const allComment = useSelector(state => state.comment.comment);
  const [postDetail, setPostDetail] = useState({});
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  useEffect(() => {
    dispatch(getPosts(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(getPosts(params.id));
  }, [dispatch, params.id]);


  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, "d MMMM yyyy", { locale: fr });
  };

  useEffect(() => {
    if (productDetails) {
      setPostDetail(productDetails);
      setComments(allComment || []);
    } else {
      setPostDetail({});
    }
  }, [productDetails]);

  const [selectedImage, setSelectedImage] = useState('');
  const carouselImages = postDetail?.prodimgs || [];
  const handleClick = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    if (carouselImages.length > 0) {
      setSelectedImage(carouselImages[0]);
    }
  }, [carouselImages]);

  const handleDelete = () => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce post ?");
    if (confirmDelete) {
      dispatch(deletePosts(params.id));
      navigate('/');
    }
  };

  const getText = (html) => {
    const cleanedHtml = DOMPurify.sanitize(html);
    const doc = new DOMParser().parseFromString(cleanedHtml, "text/html");
    return doc.body.textContent;
  };
  

  const handleCommentSubmit = () => {
    if (getUserId !== null) {
      const userId = getUserId.id;
    if (newComment.trim()) {
       dispatch(createComment({ postId: params.id, userId : userId, comment: newComment })).then(() => {
         setNewComment('');
         dispatch(getPosts(params.id)); // Fetch the updated post
       });
    }
  }
  window.location.reload();
  };

  // const handleEditComment = (commentId) => {
  //   setEditingCommentId(commentId);
  //   const commentToEdit = comments.find(comment => comment.id === commentId);
  //   if (commentToEdit) {
  //     setEditingCommentText(commentToEdit.comment);
  //   }
  // };

  // const handleEditCommentSubmit = () => {
  //   const userId = getUserId.id;
  //   if (editingCommentText.trim() || getUserId !== null) {
  //     dispatch(updateComment({ id: editingCommentId, postId : params.id, userId : userId, comment: editingCommentText })).then(() => {
  //       setEditingCommentId(null);
  //       setEditingCommentText('');
  //       dispatch(getAllComments()); // Rafraîchir les commentaires après la modification
  //     });
  //   }
  //   window.location.reload();
  // };

  // const handleDeleteComment = (commentId) => {
  //   const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce commentaire ?");
  //   if (confirmDelete) {
  //    dispatch(deleteComments(commentId)).then(() => {
  //       dispatch(getPosts(params.id)); 
  //    });
  //    window.location.reload();
  //   }
  // };
  return (
    <>
      <Navbar />
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to='/' className="animate__fadeInUpe">Accueil</Link></li>
            <li>réalisation</li>
          </ol>
          <h2>Détail</h2>
        </div>
      </section>
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card mb-3">
                <img className="card-img img-fluid" src={selectedImage} alt="CardImag" id="product-detail" />
              </div>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="carousel-container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                  }
                }}
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {carouselImages.map((image, index) => (
                  <img
                    key={index}
                    className="carousel-img"
                    src={image}
                    alt={`CarouselImage ${index}`}
                    onClick={() => handleClick(image)}
                  />
                ))}
              </Carousel>
            </div>
            <div className="col-lg-7 mt-5">
              <div className="card">
                <div className="card-body">
                  <h1 className="h2">{postDetail?.title || ''}</h1>
                  <p className="h3 py-2">Lieu : {postDetail?.place || ''}</p>

                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Catégorie: </h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>{postDetail?.categories?.category || ''}</strong>
                      </p>
                    </li>
                  </ul>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <h6>Date :</h6>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted">
                        <strong>{formatDate(postDetail?.eventdate)}</strong>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
          <h1 className="h2 titl">{postDetail?.title || ''}</h1>
            <div dangerouslySetInnerHTML={{ __html: getText(postDetail.description) }} />
          </div>
          <div className="btn-group mt-3">
                    <Link className="btn btn-primary" to={`/post?edit=${postDetail.id}`} state={postDetail} >
                      <FaEdit /> Éditer
                    </Link>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      <FaTrash /> Supprimer
                    </button>
                    {/* <button className="btn btn-secondary" onClick={() => setShowCommentInput(!showCommentInput)}>
                      <FaComment /> Commenter
                    </button> */}
                  </div>

                  {showCommentInput && (
  <div className="mt-3">
    <textarea
      className="form-control"
      placeholder="Ajouter un commentaire"
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    />
    <button className="btn btn-success mt-2" onClick={handleCommentSubmit}>
      Envoyer
    </button>
  </div>
)}

                 {/* {  
                 comments.length > 0 && ( 
                  <div className="mt-4">
                    <h5>Commentaires récents :</h5>
                    <ul className="list-group">
                    {comments.map((comment, index) => (
                        <li key={index} className="list-group-item">
                          {editingCommentId === comment.id ? (
                            <> <textarea
                            className="form-control"
                            placeholder="Ajouter un commentaire"
                            value={editingCommentText}
                            onChange={(e) => setEditingCommentText(e.target.value)}
                          />
                              <button className="btn btn-success mt-2" onClick={handleEditCommentSubmit}>
                                Sauvegarder
                              </button>
                              <button
                                className="btn btn-secondary mt-2"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingCommentText('');
                                }}
                              >
                                Annuler
                              </button>
                            </>
                          ) : (
                            <>
                             {comment.posts && comment.posts.users && comment.posts.users.firstname && (
                <p>{comment.posts.users.firstname}</p> 
              )}
                             <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
                              <small className="text-muted">{formatDate(comment.createdAt)}</small>  <br/>
                              <div className="btn-group mt-2">
                                <button className="btn btn-primary btn-sm" onClick={() => handleEditComment(comment.id)}>
                                  <FaEdit /> Éditer
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteComment(comment.id)}>
                                  <FaTrash /> Supprimer
                                </button>
                              </div>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                 ) }      */}
        </div>
      </section>
      <Footer />
      <BackTop />
    </>
  );
};

export default Detail;

