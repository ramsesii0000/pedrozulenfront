import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import golden from '../assets/golden_icon.png';
import '../css/Contact.css';
import emailService from '../service/EmailService';
import Swal from 'sweetalert2';
 
 
const Contacts = () => {
 
    const [consultation, setConsultation] = useState('');
    const [name, setName] = useState('');
    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [details, setDetails] = useState('');
 
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            console.log('Datos del formulario:', {
                consultation,
                name,
                toEmail,
                subject,
                details,
                token
            });
 
            const emailData = {
                consultation,
                name,
                toEmail,
                subject,
                details
            };
   
            await emailService.sendEmail(emailData, token);
 
            setConsultation('');
            setName('');
            setToEmail('');
            setSubject('');
            setDetails('');
   
            Swal.fire({
                icon: 'success',
                title: 'Correo Enviado',
                text: 'En breve atención al cliente se comunicará contigo.'
            });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
        }
    };
   
 
    return (
        <main>
            <div  className="contact-title-principal">
                <h1>Atención al cliente</h1>
            </div>
           
            <div className="container-contact">
                <span className="big-circle"></span>
                <div className="form-contact">
                    <div className="contact-info">
                        <h3 className="title-contacto">Tus dudas al instante</h3>
                        <p className="text">
                            Si tienes alguna duda o problema puedes comunicarte con uno de nuestros canales telefónicos o por medio de tu correo electrónico.
                        </p>
                        <div className="info">
                            <div className="information">
                                <FontAwesomeIcon icon={faPhone} size="2x" className='icon-contact' />
                                <p>+51 918-684-351</p>
                            </div>
                            <div className="information">
                                <FontAwesomeIcon icon={faWhatsapp} size="3x" className='icon-contact'/>
                                <p>+51 918-684-668</p>
                            </div>
                            <div className='img-contact-container'>
                                <img src={golden} alt="" className='image-golden' />
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <span className="circle one"></span>
                        <span className="circle two"></span>
                        <form className='form-contacto' onSubmit={handleSubmit}>
                            <h3 className="title-contacto-contacto">Contáctanos</h3>
                            <div className="input-container">
                                <label className='subtitle-contact'>Tipo de Consulta</label>
                                <select name="consultation" className="input-select-consulta" required value={consultation} onChange={(e) => setConsultation(e.target.value)}>
                                    <option style={{color: "black"}} value="Catálogo de Libros">Catálogo de Libros</option>
                                    <option style={{color: "black"}} value="Fecha de Préstamos">Fecha de Préstamos</option>
                                    <option style={{color: "black"}} value="Fecha de Retorno">Fecha de Retorno</option>
                                    <option style={{color: "black"}} value="Devolución de Libro">Devolución de Libro</option>
                                    <option style={{color: "black"}} value="Libro Favorito">Libro Favorito</option>
                                    <option style={{color: "black"}} value="Otro">Otros</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label className='subtitle-contact'>Nombre</label>
                                <input type="text" name="name" className="input-contact" required value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="input-container">
                                <label className='subtitle-contact'>Email</label>
                                <input type="email" name="toEmail" className="input-contact" required value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
                            </div>
                            <div className="input-container">
                                <label className='subtitle-contact'>Asunto</label>
                                <input type="text" name="subject" className="input-contact" required value={subject} onChange={(e) => setSubject(e.target.value)} />
                            </div>
                            <div className="input-container textarea">
                                <label className='subtitle-contact'>Detalles</label>
                                <textarea name="details" className="input-contact" value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
                            </div>
                            <input type="submit" value="Enviar" className="btnEnviarEmail" />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
 
export default Contacts;