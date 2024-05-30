import { createContext, useEffect, useState } from "react";
import { axiosIntance } from "../axios";
//import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  //const navigate = useNavigate();
  const login = async (email, password) => {
    const res = await axiosIntance.post(`/signin`, {
     email, 
     password,
   })

    setCurrentUser(res.data)
  };

  const handleLogout = async () => {
    alert("Voulez-vous vous deconnecter?");
    try {
      await axiosIntance.post(`/logout`)
       localStorage.clear();
       setCurrentUser(null);
       //navigate('/'); 
    } catch (err) {
       console.log(err.response.data)
    }
 }
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );

};