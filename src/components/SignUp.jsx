
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faLock, faAddressCard, faExclamationTriangle,faEyeSlash, faEye  } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../css/Login.css';
import userService from '../service/userService';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        dni: '',
        correo: '',
        contraseña: '',
    });

    const [errorMessages, setErrorMessages] = useState({
        dni: '',
        correo: '',
        contraseña: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMessages({
            ...errorMessages,
            [e.target.name]: '',
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const dni = formData.dni;
        const correo = formData.correo;
        const contraseña = formData.contraseña;

        // Validación de DNI
        if (!/^\d{8}$/.test(dni)) {
            setErrorMessages({
                ...errorMessages,
                dni: 'El DNI debe contener exactamente 8 dígitos',
            });
            return;
        }

        // Validación de correo electrónico
        if (!/\S+@\S+\.\S+/.test(correo)) {
            setErrorMessages({
                ...errorMessages,
                correo: 'El correo electrónico debe tener un formato válido',
            });
            return;
        }

        // Validación de contraseña
        if (!/^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{12,}$/.test(contraseña)) {
            setErrorMessages({
                ...errorMessages,
                contraseña: 'Debe incluir 1 minúscula, 1 especial, 1 número y tener 12 caracteres',
            });
            return;
        }

        try {
            const response = await userService.userRegister({ 
                nameUser: formData.nombre,
                lastnameUser: formData.apellidos,
                dniUser: dni,
                emailUser: correo,
                passwordUser: contraseña,
                role: {
                    nameRol: "user"
                }
            });

            console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: '¡Bienvenido! Tu cuenta ha sido creada.',
                showConfirmButton: false,
                timer: 2000,
            });

            setFormData({
                nombre: '',
                apellidos: '',
                dni: '',
                correo: '',
                contraseña: '',
            });
            
            setErrorMessages({
                dni: '',
                correo: '',
                contraseña: '',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al Registrar',
                text: 'Hubo un problema al intentar crear tu cuenta. Por favor, verifica tus datos e inténtalo nuevamente.',
            });
            console.error('Error al registrar usuario:', error.message);
        }
    };

    return (
        <form onSubmit={handleRegister} className='sign-up-form'> 
            <h2 className='title'>Registrarse</h2> 
            <div className='inputs-field'>
                <FontAwesomeIcon icon={faUser} className='i' />
                <input type="text" placeholder="Nombre" name='nombre' aria-label="Nombre" value={formData.nombre} onChange={handleInputChange} required/>
            </div>
            <div className='inputs-field'>
                <FontAwesomeIcon icon={faUser} className='i' />
                <input type="text" placeholder="Apellidos" name='apellidos' aria-label="Apellidos" value={formData.apellidos} onChange={handleInputChange} required/>
            </div>
            <div className='inputs-field'>
                <FontAwesomeIcon icon={faAddressCard} className='i'/>
                <input type="text" placeholder="DNI" name='dni' aria-label="Apellidos" value={formData.dni} onChange={handleInputChange} required/>
                {errorMessages.dni && <p className="error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> {errorMessages.dni}</p>}
            </div>
            <div className='inputs-field'>
                <FontAwesomeIcon icon={faAt} className='i' />
                <input type="text" placeholder="Correo Electrónico" name='correo' aria-label="Correo Electrónico" value={formData.correo} onChange={handleInputChange} required/>
                {errorMessages.correo && <p className="error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> {errorMessages.correo}</p>}
            </div>
            <div className='inputs-field'>
                <FontAwesomeIcon icon={faLock} className='i' />
                <input type={showPassword ? "text" : "password"}  placeholder="Contraseña" name='contraseña' aria-label="Contraseña" value={formData.contraseña} onChange={handleInputChange} required/>
                <button 
                    type="button" 
                    onClick={handleTogglePasswordVisibility}
                    className='password-toggle-button'
                    >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                {errorMessages.contraseña && <p className="error-message"><FontAwesomeIcon icon={faExclamationTriangle} /> {errorMessages.contraseña}</p>}
            </div>
            <input type="submit" value="Registrarse" className='btn' />
            <p className='social-text'>Síguenos en nuestras Redes Sociales</p>
            <div className='social-media'>
                <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a> 
                <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
            </div>
        </form>
    );
};

export default SignUp;
