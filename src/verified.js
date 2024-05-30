export const registerValidation = (firstName,lastName,email, password, birthday) =>{
       const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;;
       const fillNameValid = !firstName.match(nameRegex)  || !lastName.match(nameRegex) || firstName === ''|| lastName === ''; 

       const emailRegex = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i;
       const emailValid = !email.match(emailRegex) || email === "";

       const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
       const passwordValid = !password.match(passwordRegex)|| password === '';

       const birthdayValid = birthday === false  
       return fillNameValid  || emailValid  || passwordValid || birthdayValid 
}

 export const loginValidation = (email, password) =>{
   const emailRegex = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i;
   const emailValid = !email.match(emailRegex) || email === "";
   const passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
   const passwordValid = !password.match(passwordRegex)|| password === '';
   return emailValid  || passwordValid 
}   