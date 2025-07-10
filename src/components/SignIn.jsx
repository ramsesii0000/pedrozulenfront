import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import loginService from '../service/loginService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import '../css/Login.css';
 
export const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usuarioValido, setUsuarioValido] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const emailUser = e.target.querySelector('[name="email"]').value;
    const passwordUser = e.target.querySelector('[name="password"]').value;
 
    console.log('Datos enviados al backend:', { emailUser, passwordUser });
 
    try {
      const response = await loginService.login({ emailUser, passwordUser });
   
      const { role, token, idUser } = response;
 
      
     
      if (role === 'ROLE_ADMIN' || role === 'ROLE_USER') {
        localStorage.setItem('token', token);
   
        localStorage.setItem('userRole', role);
 
        localStorage.setItem('userId', idUser);
   
        console.log('userRole almacenado en localStorage:', role);
 
 
   
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión Exitoso',
          showConfirmButton: false,
          timer: 1500,
        });
        if (role === 'ROLE_ADMIN') {
          navigate('/dashboard');
        } else if (role === 'ROLE_USER') {
          navigate('/');
        }
      } else {
        console.log('Rol no reconocido');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales Inválidas',
        text: 'Por favor, verifica tu usuario y contraseña.',
      });
      console.error('Error al autenticar usuario:', error.message);
    }
  };
 
  const captcha = useRef(null);
 
  const onChange= () => {
    if(captcha.current.getValue()){
      setUsuarioValido(true);
    }
  }
 
 
  return (
    <form onSubmit={handleLogin} className='sign-in-form'>
      <h2 className='title'>Iniciar Sesión</h2>
      <div className='inputs-field'>
        <FontAwesomeIcon icon={faUser} className='i' />
        <input type="text" placeholder="Usuario" name="email" aria-label="Username" />
      </div>
      <div className='inputs-field'>
        <FontAwesomeIcon icon={faLock} className='i' />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name="password"
          aria-label="Password"
        />
        <button
          type="button"
          onClick={handleTogglePasswordVisibility}
          className='password-toggle-button'
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>
      <input type="submit" value="Iniciar Sesión" className='btn' />
      <ReCAPTCHA
          sitekey="6LfZSa4pAAAAAOfPFgaq9T8e_wi1ZKesfuGR5nUL"
          onChange={onChange}
          ref={captcha}
        />
    </form>
  );
};
 
export default SignIn;