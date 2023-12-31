import React, { useState } from "react";
import "./signUp.css";
import signUpAnim from "./signUp.json";
import Lottie from "lottie-react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import {getAuth,createUserWithEmailAndPassword , GoogleAuthProvider , signInWithPopup}  from 'firebase/auth'
import {app} from '../../../../fireBaseConfig'

// create instance of app 
const auth = getAuth(app);


const provider = new GoogleAuthProvider();


const SignUp = ({ onsucessFullSignUp }) => {
  const[userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");





  //funcition
   const MainFunction = () => {

    // manage the state of the user
     const handleState = () => {
       onsucessFullSignUp();
     };

     const createUser = createUserWithEmailAndPassword(auth, email, password , userName)
     .then((userCredential)=>{
      // user  is sign up
      const user = userCredential.user;
      // console.log(user);
     })
     .catch((err)=>{
       const errorCode = err.code;
       const errorMessage = err.message;
       console.log(errorCode+ " " + errorMessage);
     })



     handleState();
     

   }

   const handleLoginWithGoogle = () =>{
    signInWithPopup(auth,provider)
    .then((result)=> console.log(result))
    .catch((error)=> console.log(error))
   }

 
  return (
    <>
      <div className="loginContainer">
        <div className="mainSignUpContainer">
          <div className="animation">
            <Lottie animationData={signUpAnim} className="signUpAnim" />
          </div>

          <div className="signUpInfo">
            <h3>sign up</h3>

            <div className="signUpData">
              <div className="signUpName">
                <FaUser className="icons" />
                <input type="text" placeholder="your name" id="name" onChange={(e)=>setUserName(e.target.value)} value={userName} autoComplete="off"/>
              </div>
              <div className="signUpEmail">
                <MdEmail className="icons" />
                <input type="email" placeholder="enter your email"  id="email" onChange={e=> setEmail(e.target.value)}
                value={email} autoComplete="off"/>
              </div>
              <div className="signUpPassWord">
                <RiLockPasswordFill className="icons" />
                <input type="password" placeholder=" enter your password" id="password" onChange={e => setPassword(e.target.value)}
                  value={password} autoComplete="off" />
              </div>

              <button
                type="submit"
                className="signUpButton"
                onClick={MainFunction}
              >
                sign up
              </button>
            </div>

            <div className="endSignUpData">
              <h4>or connect with social media</h4>
              <div className="socialMediaOne">
                <FcGoogle />
                <label onClick={handleLoginWithGoogle}> sign up with google</label>
              </div>
              <div className="socialMediaTwo">
                <FaFacebookF />
                <label>sign up with facebook </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
