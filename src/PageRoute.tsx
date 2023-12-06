import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Routines from './pages/Routines';

export const PageRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/dashboard" element={<Dashboard userType='trainer'/>} />
                <Route path="/routines" element={<Routines/>} />
                <Route element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    )
}