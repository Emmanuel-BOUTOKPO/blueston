import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

//import { createPost, getAllPosts, updatePost } from "../../redux/features/Post/postSlice";
import "./write.css";
import BackTop from "../../components/backToTop/BackTop";
import Navbar from "../../components/navbars/Navbar";
import Footer from "../../components/footer/Footer";
import { getAllCats } from "../../redux/features/cat/catSlice";
import { createPost, getAllPosts, updatePost } from "../../redux/features/post/postSlice";

const Post = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title|| "");
  const [eventdate, setEventDate] = useState(state?.eventdate || "");
  const [value, setValue] = useState(state?.description || "");
  const [place, setPlace] = useState(state?.place || "");
  const [categoryId, setCategoryId] = useState(state?.categoryId || "");
  const [imgprod, setImgProd] = useState(state?.imgprod || "");
  const [prodimgs, setProdimgs] = useState(state?.prodimgs || []);

  const [imgPostPreview, setImgPostPreview] = useState(null);
  const [multipleImgsPreview, setMultipleImgsPreview] = useState([]);
  
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const categorie = useSelector(state => state.cat.category); 
  const dispatch = useDispatch();

  //------------------------  Create and edit Post ------------------------

  useEffect(() => {
    dispatch(getAllCats());
}, [dispatch])

useEffect(() => {
    if (categorie) {
      setCat(categorie)
    } else {
      setCat([])
    }
}, [categorie]);

// const getText = (html) => {
//   const cleanedHtml = DOMPurify.sanitize(html);
//   const doc = new DOMParser().parseFromString(cleanedHtml, "text/html");
//   return doc.body.textContent;
// };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getUserId = JSON.parse(localStorage.getItem("users"));

    if (getUserId !== null) {
      const userId = getUserId.id;
      const formData = new FormData();
       
      if (!title || !eventdate || !categoryId || !place || !imgprod || !prodimgs) {
        toast.error("Veuillez renseigner le champs !");
      } else if (!state) {
        formData.append("title", title);
        formData.append("eventdate", eventdate);
        formData.append("description", value);
        formData.append("categoryId", categoryId);
        formData.append("userId", userId);
        formData.append("place", place);
        formData.append("imgprod", imgprod);
        prodimgs.forEach((img, index) => {
          formData.append(`prodimgs[${index}]`, img);
        });
        dispatch(createPost(formData));
        toast.success("Votre post a été créé avec succès !");
        navigate("/");
      } else {
        let id = state.id;
        dispatch(updatePost({ id, title, eventdate, description: value, categoryId, userId, place, imgprod, prodimgs}));
        toast.success("Votre post a été modifié avec succès !");
        navigate("/");
      }
       dispatch(getAllPosts());
    }
  };

  // Handle image preview for single image
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    setImgProd(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPostPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle image preview for multiple images
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setProdimgs(files);

    const previewUrls = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewUrls).then((urls) => {
      setMultipleImgsPreview(urls);
    });
  };

  //----------------------------Render ------------------------------------------

  return (
    <>
      <Navbar />
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="container">
          <ol>
            <li><Link to='/' className="animate__fadeInUpe">Accueil</Link></li>
            <li><Link  to='/post' className="animate__fadeInUpe">Post</Link></li>
          </ol>
          <h2>{state?"Modifier" : "Poster"} un article</h2>
        </div>
      </section>
      <div className="container contPost">
        <div>
          <form className="add" onSubmit={handleSubmit}>
            <div className="col-md-7">
              <input
                type="text"
                placeholder="Title"
                className="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <div className="editorContainer">
                <ReactQuill
                  className="editor"
                  theme="snow"
                  value={value}
                  onChange={setValue}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="item">
                <h1>Catégorie et date de l'événement</h1>
                <div className="cat">
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option>Selectionner une catégorie </option>
                     {
                      cat.map((item, id) => (
                        <option key={id} value={item.id}>{item.category}</option>
                      ))
                    }  
                  </select>
                  <br />
                  <input
                    type="date"
                    value={eventdate}
                    className="readTime"
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="item">
                <h1>Publier</h1>
                <div>
                  <input
                    type="text"
                    value={place}
                    placeholder="Lieu de l'événement"
                    className="Lieu"
                    onChange={(e) => setPlace(e.target.value)}
                  />
                </div>

                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  onChange={handleSingleImageChange}
                />
                <label className="file" htmlFor="file">
                  Uploader une image principale
                </label>
                {imgPostPreview && (
                  <div className="imgPreview">
                    <img src={imgPostPreview} alt="primaryImg" style={{width : '25%'}}/>
                  </div>
                )}

                <input
                  style={{ display: "none" }}
                  type="file"
                  id="multipleFiles"
                  multiple
                  onChange={handleMultipleImagesChange}
                />
                <label className="file" htmlFor="multipleFiles">
                  Uploader plusieurs images
                </label>
                <div className="imgPreviews">
                  {multipleImgsPreview.map((src, index) => (
                    <img key={index} src={src} style={{width : '25%', marginRight : "5px"}} alt={`imgSec${index + 1}`} />
                  ))}
                </div>

                <div className="buttons">
                  <button className="button1">Brouillon</button>
                  <button className="button2" type="submit">
                    {state ? "Modifier" : "Publier"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />
      <BackTop />
      <Footer />
    </>
  );
};

export default Post;
