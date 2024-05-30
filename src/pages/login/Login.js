import React,{useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "./login.css"
import { login } from "../../redux/features/auth/authSlice";

const Login = () => {
  const initial = {
     email : "",
     password : ""
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading} = useSelector(state => state.auth);
  const [formValue, setFormValue] = useState(initial);
  const [err, setErr] = useState(null);
  const{email, password} = formValue;
 
  const handleSubmit = (e) =>{
       e.preventDefault();

       if (!email || !password) {
           setErr("Veuillez renseigner les champs");
       }else{
        try {
          dispatch(login({formValue, navigate}))
        
        } catch (error) {
            setErr(error)
        }
       }
      }

  const handleChange = (e) =>{
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value })
  }
 
  return (
<>
  <div className="createCompte">
  <div className="logs">
          <Link className="oros">
              BLUESTON
          </Link>
        <h1 className="createTitles">Se connecter</h1>
        </div> 
           {err && <p className="error">{err}</p>} 
      <form className="formLogin" onSubmit={handleSubmit}>
      <div className="form-group">
            <input type="email" autoComplete="off"  className="loginInputs" placeholder="Email"   name="email" value={email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input type="password" autoComplete="off"  className="loginInputs" placeholder="Mot de password"   name="password" value={password} onChange={handleChange}/>
          </div>
          {error && <p className="error">{error.error}</p>} 
        <button  type="submit" className="loginRegisterButtons" disabled={loading && true}> {loading ? 'Loading...' : 'Se connecter'}</button>
        <span className="spanCreate">
             N'avez pas un compter veuillez vous <Link to="/register">inscrire</Link>
        </span>
      </form>
    </div>
    </>
  );
};

export default Login;
