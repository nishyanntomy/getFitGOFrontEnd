import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Routines from './pages/Routines';
import ExercisePage from './pages/Visualization';
import ClientDetails from './pages/ClientDetails';
import WorkoutHistory from './pages/WorkoutHistory';
import PendingRequests from './pages/PendingRequests';
import React from 'react';
import Diets from './pages/Diets';


export const PageRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/dashboard" element={<Dashboard userType={localStorage.getItem('user_type')}/>} />
                <Route path="/routines" element={<Routines/>} />
                <Route path="/top-exercise" element={<ExercisePage/>} />
                <Route path="/client" element={<ClientDetails/>} />
                <Route path="/workout-history" element={<WorkoutHistory/>} />
                <Route path="/pending-client-requests" element={<PendingRequests/>} />
                <Route path="/diets" element={<Diets/>} />
                <Route element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    )
}