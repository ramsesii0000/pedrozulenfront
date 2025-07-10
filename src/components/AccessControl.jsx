import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessControl = ({ allowedRoles, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!allowedRoles.includes(userRole)) {
      navigate('/');
    }
  }, [allowedRoles, navigate]);

  return <>{children}</>;
};

export default AccessControl;
