import React, { useState, useEffect } from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import golden from '../assets/golden_icon.png';
import leyendo from '../assets/leyendo.png';
import '../css/Login.css';

const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleMode = () => {
    console.log('Toggle Mode - isSignUpMode:', isSignUpMode);
    setIsSignUpMode(!isSignUpMode);
  };

  useEffect(() => {
    const container = document.querySelector('.container');
    if (container) {
      container.classList.toggle('sign-up-mode', isSignUpMode);
    }
  }, [isSignUpMode]);
  

  return (
    <div className='container'>
      <div className='signin-signup'>
        {isSignUpMode ? (
          <>
            <SignUp />
            <SignIn />
          </>
        ) : (
          <>
            <SignIn />
            <SignUp />
          </>
        )}
      </div>
      <div className='panels-container'>
        <div className={`panel left-panel ${isSignUpMode ? 'sign-up-mode' : ''}`}>
          <div className='content'>
            <h3>Nuevo en Golden Blog</h3>
            <p>Explora nuestra biblioteca digital con la misma familiaridad de siempre, ahora con la agilidad que te mereces en cada préstamo.</p>
            <button className='btn transparent' id='sign-up-btn' onClick={toggleMode}>Registrarse</button>
          </div>
          <img src={leyendo} alt="" className='image' />
        </div>
        <div className='panel right-panel '>
          <div className='content'>
            <h3>Bienvenido a Golden Blog</h3>
            <p>Donde la magia de la lectura se encuentra con la eficiencia del préstamo digital, acercando libros a tu alcance de manera rápida y cómoda.</p>
            <button className='btn transparent' id='sign-in-btn' onClick={toggleMode}>Iniciar Sesión</button>
          </div>
          <img src={golden} alt="" className='image' />
        </div>
      </div>
    </div>
  );
};

export default Login;
