import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Login from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Books from './pages/Books';
import Home from './pages/Home'; 
import CartBooks from './pages/CartBooks';
import AccessControl from './components/AccessControl';
import DetailBook from './pages/DetailBook';
import FavoriteBookPage from './pages/FavoriteBookPage';
import Contacts from './pages/Contacts';
import MyLoans from './pages/MyLoans';

const App = () => {
  return (
    <CartProvider> 
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={<MainLayout />}
          >
            <Route index element={<Home />} />
            <Route path="/libros" element={<Books />} />
            <Route path="/favoritos" element={<FavoriteBookPage />} />
            <Route path="/carrito" element={<CartBooks />} />
            <Route path="/contacto" element={<Contacts />} />
            <Route path="/prestamos" element={<MyLoans />} />
            <Route path="/detail/:id" element={<DetailBook />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <AccessControl allowedRoles={['ROLE_ADMIN']}>
                <Dashboard />
              </AccessControl>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
