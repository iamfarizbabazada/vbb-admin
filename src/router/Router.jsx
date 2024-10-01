// src/AppRouter.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "../pages/users/index";
import Orders from "../pages/orders/index";
import Support from "../pages/support/index";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
      <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
      <Route
        path="/live_support"
        element={<ProtectedRoute element={<Support />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<Profile />} />}
      />
    </Routes>
  );
};

export default AppRouter;
