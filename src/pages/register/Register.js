import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate}  from "react-router-dom";
import "./register.css"
import { register } from '../../redux/features/auth/authSlice';

const Register = () => {
  const initialState = {
     firstname : "",
     lastname : "",
     email : "",
     password : ""
  }  

  const [formValue, setFormValue] = useState(initialState);
  const{firstname,lastname,email,password} = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth);

  const [err, setError] = useState(null);
  
  const handleSubmit = (e) =>{
        e.preventDefault()

        if (!email || !password || !firstname || !lastname) {
          setError("Veuillez renseigner les champs");
        }
        else{
          try {
            dispatch(register({formValue, navigate}))
            
          } catch (error) {
            setError(error)
          }
       }  
  }
 
  const handleChange = (e) =>{
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
}

  return (
    <>
  
      <div className="register">
      <div className="log">
          <Link className="oros">
             BLUESTON
          </Link>
        <h1 className="createTitles">Créer un compte</h1>
        </div>
         {/* {err && <p className='error'>{err}</p>}   */}
        <form className='formLogin' onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="text" autoComplete="off"  className="loginInputs" placeholder="Nom"   name="firstname" value={firstname}  onChange={handleChange}  />
          </div>
          <div className="form-group">
            <input type="text" autoComplete="off"  className="loginInputs" placeholder="Prenom"   name="lastname" value={lastname} onChange={handleChange}  />
          </div>
          <div className="form-group">
            <input type="email" autoComplete="off"  className="loginInputs" placeholder="Email"   name="email" value={email}  onChange={handleChange}  />
          </div>
          <div className="form-group">
            <input type="password" autoComplete="off"  className="loginInputs" placeholder="Mot de password"   name="password" value={password}  onChange={handleChange} />
          </div>
          <button className="loginRegisterButtons" disabled={auth.loading === 'loading'}>
          {auth.loading === 'loading' ? 'Loading...' : "S'inscrire"}
        </button>
        <span className="spanCreate">
          Avez-vous un compte? <Link to="/login">Se connecter</Link>
        </span>
        </form>
      </div>

    </>
  );
};

export default Register;
