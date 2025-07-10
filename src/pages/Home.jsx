import React, { useState } from 'react'; 
import '../css/Home.css';
import imagen from '../assets/checklist.svg';
import img1 from '../assets/img/img1.jpg';
import img2 from '../assets/img/img2.jpg';
import img3 from '../assets/img/img3.jpg';
import img4 from '../assets/img/img4.jpg';
import img5 from '../assets/img/img5.jpg';
import img6 from '../assets/img/img6.jpg';
import close from '../assets/img/close.svg';

export const Home = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalOpen(false);
  };

  return (
    
    <main>
      <div className='header-img'>
        <div className="contenedor head">
            <h1 className="titulo">Explora mundos infinitos en nuestra biblioteca digital</h1>
            <p className="copy">Donde las historias despiertan y las páginas se despliegan con un clic</p>
        </div>
      </div>
      <section className="contenedor-home" id="servicio">
        <h2 className="subtitulo">Nuestro Servicio</h2>
        <div className="contenedor-servicio">
          <img src={imagen} alt="Descripción de la imagen" />
          <div className="checklist-servicio">
            <div className="service"> 
              <h3 className="n-servicios"><span className="number">1</span>Los Mejores Libros</h3>
              <p>Explora el vasto universo de la literatura con nuestra biblioteca digital.
              Ofrecemos acceso fácil a una amplia selección de libros para préstamo en línea.
              Descubre historias fascinantes desde la comodidad de tu pantalla.</p>
            </div>
            <div className="service"> 
              <h3 className="n-servicios"><span className="number">2</span>Reserva y Recoge</h3>
              <p>Reserva tus libros favoritos desde casa y recógelos en la biblioteca.
              Simplificamos el proceso para que disfrutes de tus selecciones de manera fácil y rápida,
              brindándote la experiencia perfecta para explorar y leer.</p>
            </div>
            <div className="service"> 
              <h3 className="n-servicios"><span className="number">3</span>Guarda tus Tesoros Literarios</h3>
              <p>Explora nuestro vasto catálogo y guarda tus libros favoritos para construir
              tu biblioteca digital personalizada. Crea un espacio virtual donde cada libro
              atesore momentos inolvidables y se convierta en parte de tu viaje literario.</p>
            </div>
          </div>
        </div>
      </section>
      <section className='gallery' id='list'>
        <div className='contenedor-home'>
          <h2 className="subtitulo">Los Mejores libros</h2>
          <div className='contenedor-galeria'>
            <img src={img1} alt="" className="img-galeria" onClick={() => openModal(img1)} />
            <img src={img2} alt="" className="img-galeria" onClick={() => openModal(img2)} />
            <img src={img3} alt="" className="img-galeria" onClick={() => openModal(img3)} />
            <img src={img4} alt="" className="img-galeria" onClick={() => openModal(img4)} />
            <img src={img5} alt="" className="img-galeria" onClick={() => openModal(img5)} />
            <img src={img6} alt="" className="img-galeria" onClick={() => openModal(img6)} />
          </div>
        </div>
      </section>
      {modalOpen && (
        <div className="modal-gallery" onClick={closeModal}>
          <div className="modal-content-galley">
            <img src={selectedImage} alt="" className="modal-image" />
            <img src={close} alt="" className="close" onClick={closeModal} />
          </div>
        </div>
      )}
    </main>
  )
}

export default Home;
