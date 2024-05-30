import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Realisation from './pages/realisation/Realisation';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Shop from './pages/shop/Shop';
import Detail from './pages/detail/Detail';
import Post from './pages/post/Post';
import PrivateRouteLogin from './components/hoc/PrivateRouteLogin';
import { useDispatch } from 'react-redux';
import { isUserLoggedIn } from './redux/features/auth/authSlice';
import { getAllCats } from './redux/features/cat/catSlice';
import { getAllPosts } from './redux/features/post/postSlice';
import Crew from './pages/crew/Crew';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
    dispatch(getAllCats());
    dispatch(getAllPosts())
  }, [dispatch]);
  
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/' element={<PrivateRouteLogin />}>
              <Route exact path='/login' element={<Login />} />
          </Route> 
          <Route exact path='/about' element={<About />} />
          <Route exact path='/crew' element={<Crew />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/post' element={<Post />} />
          <Route exact path='/realization' element={<Realisation />} />
          <Route exact path='/shop/:category' element={<Shop />} />
          <Route exact path='/detail/:id' element={<Detail />} />
          <Route exact path='/contact' element={<Contact />} />
        </Routes>
      </Router>


    </>
  )
}

export default App;
