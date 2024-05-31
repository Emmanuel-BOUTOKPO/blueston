import React, { useState } from 'react';
import './navbars.css'
import { NavLink, Link, useLocation, Outlet } from "react-router-dom";
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { reset } from '../../redux/features/post/postSlice';
import { useDispatch } from 'react-redux';



const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const users = JSON.parse(localStorage.getItem("users"));
  const isActiveLink = (linkPath) => {
    return location.pathname === linkPath;
  };
  const handleLogout = () => {
    alert("Voulez-vous vous deconnecter?");
    dispatch(reset())
 }


  return (
    <header id="header" className="d-flex align-items-center">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="logo">
          <h1><NavLink to="/" className='logoTitle'>Blue'Ston
            <img src="/assets/Gmail/logor.png" className="img-fluid" alt="img" />
          </NavLink></h1>

        </div>
        <nav id="navbar" className="navbar">
          <ul className="navigation-menu-main">
            <li>
              <NavLink aria-current="page" className={isActiveLink('/') ? 'navigation-menu-active' : ''} to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/realization" className={isActiveLink('/realization') ? 'navigation-menu-active' : ''}>Réalisation</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={isActiveLink('/about') ? 'navigation-menu-active' : ''}>A propos</NavLink>
            </li>
            <li>
                    <NavLink to="/post" className={isActiveLink('/post') ? 'navigation-menu-active' : ''}>Poster un article</NavLink>
                  </li> 
                  <li>
                    <Link to="/crew" className={isActiveLink('/crew') ? 'navigation-menu-active' : ''}>Equipe</Link>
                  </li>
                  <li>
                       <NavLink to="/login" className={isActiveLink('/schedule') ? 'navigation-menu-active' : ''}>S'inscrire</NavLink>
                    </li>
                  
            {/* {
               (users === null) ?
                  <Outlet /> :
                  (users.status === "ADMIN") ?
                  <li>
                    <NavLink to="/post" className={isActiveLink('/post') ? 'navigation-menu-active' : ''}>Poster un article</NavLink>
                  </li> :
                     <Outlet />
            }
             {(users === null) ?
                  <Outlet /> :
                  (users.status === "ADMIN") ?
                  <li>
                    <Link to="/crew" className={isActiveLink('/crew') ? 'navigation-menu-active' : ''}>Equipe</Link>
                  </li> :
                     <Outlet />
            } */}
            <li>
              <NavLink to="/contact" className={isActiveLink('/contact') ? 'navigation-menu-active' : ''}>Contact</NavLink>
            </li>
            {/* {
               (users === null) ?
                  ( 
                     <li>
                       <NavLink to="/login" className={isActiveLink('/schedule') ? 'navigation-menu-active' : ''}>S'inscrire</NavLink>
                    </li>
                  ) :
                  (
                     <>
                     <li>
                       <NavLink onClick={handleLogout}>Deconnexion</NavLink>
                    </li>
                  </>
                  )
            } */}
          </ul>
          <div className="app__navbar-menu">
              <HiMenuAlt4 onClick={() => setToggle(true)} />

            {toggle && (
              <motion.div
                whileInView={{ x: [300, 0] }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
              >
                <HiX className='x-icons' onClick={() => setToggle(false)} />
      
                <ul>
                  <li>
                    <Link aria-current="page" onClick={() => setToggle(false)} to="/">Accueil</Link>
                  </li>
                  <li>
                   <Link to="/shop/:categorie" className={isActiveLink('/realization') ? 'navigation-menu-active' : ''}>Réalisation</Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={() => setToggle(false)}>A propos</Link>
                  </li>
                  <li>
                    <Link to="/post" className={isActiveLink('/post') ? 'navigation-menu-active' : ''}>Poster un article</Link>
                  </li>
                  <li>
                    <Link to="/crew" className={isActiveLink('/crew') ? 'navigation-menu-active' : ''}>Equipe</Link>
                  </li>
                  <li>
                    <Link to="/crew" className={isActiveLink('/crew') ? 'navigation-menu-active' : ''}>Equipe</Link>
                  </li>
                  {/* {
               (users === null) ?
                  <Outlet /> :
                  (users.status === "ADMIN") ?
                  <li>
                    <Link to="/post" className={isActiveLink('/post') ? 'navigation-menu-active' : ''}>Poster un article</Link>
                  </li> :
                     <Outlet />
            }
            
           { 
            (users === null) ?
                  <Outlet /> :
                  (users.status === "ADMIN") ?
                  <li>
                    <Link to="/crew" className={isActiveLink('/crew') ? 'navigation-menu-active' : ''}>Equipe</Link>
                  </li> :
                     <Outlet />
            }
            

                  {
               (users === null) ?
                  ( 
                     <li>
                       <Link to="/login" className={isActiveLink('/schedule') ? 'navigation-menu-active' : ''}>S'inscrire</Link>
                    </li>
                  ) :
                  (
                     <>
                     <li>
                       <Link onClick={handleLogout}>Deconnexion</Link>
                    </li>
                  </>
                  )
            } */}
             <li>
                       <Link to="/login" className={isActiveLink('/schedule') ? 'navigation-menu-active' : ''}>S'inscrire</Link>
                    </li>
                  <li>
                    <Link to="/contact" onClick={() => setToggle(false)}>Contact</Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>

        </nav>
      </div>
    </header>
  )
}

export default Navbar
