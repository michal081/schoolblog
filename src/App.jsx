import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from './Pages/Login';
import { auth } from './Fire base/Firebase-config';
import { signOut } from 'firebase/auth';
import CreateForm from './Pages/CreateForm';
import Contact from './Pages/Contact';
import About from './Pages/About';

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');

  // Sign-out functionality
  const GoogleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };

  // Update `isAuth` on storage change
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(localStorage.getItem('isAuth') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div>
      <Navbar GoogleSignOut={GoogleSignOut} isAuth={isAuth} />

      <Routes>
        {/* Public route */}
        <Route path='/login' element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to='/' />} />

        {/* Protected routes */}
        <Route path='/' element={isAuth ? <Home isAuth={isAuth} /> : <Navigate to='/login' />} />
        <Route path='/create-form' element={isAuth ? <CreateForm isAuth={isAuth} /> : <Navigate to='/login' />} />
        <Route path='/about' element={isAuth ? <About /> : <Navigate to='/login' />} />
        <Route path='/contact' element={isAuth ? <Contact /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
