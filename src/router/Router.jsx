
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Users from '../pages/users/index'
import Orders from '../pages/orders/index'
import Support from '../pages/support/index'
import Register from '../pages/register/Register';
import Profile from '../pages/profile/Profile';


const AppRouter = () => {
    return (
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/live_support" element={<Support />} />
                <Route path="/users" element={<Users />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
    )
}

export default AppRouter 