import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../Fire base/Firebase-config';

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  // Google Sign-In functionality
  const GoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        localStorage.setItem('isAuth', 'true');
        setIsAuth(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className='loginPage'>
      <p>Sign in with Google</p>
      <button className='login-with-google-btn' onClick={GoogleSignUp}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
