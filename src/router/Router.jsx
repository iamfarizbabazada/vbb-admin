// src/AppRouter.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "../pages/users/index";
import Orders from "../pages/orders/index";
import Support from "../pages/support/index";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import Admins from "../pages/admins/Index";
import Extracts from "../pages/extracts/Index";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Register />} />
      <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
      <Route path="/extracts" element={<ProtectedRoute element={<Extracts />} />} />
      <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
      <Route path="/admins" element={<ProtectedRoute element={<Admins />} />} />
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
