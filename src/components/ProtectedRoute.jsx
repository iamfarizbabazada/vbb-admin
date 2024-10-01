// src/components/ProtectedRoute.js

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.auth.user);

  return user ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
