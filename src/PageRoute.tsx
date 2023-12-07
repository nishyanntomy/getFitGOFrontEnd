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
import Visualization from './pages/Visualization';
import Clients from './pages/Clients';
import TrainerClientDetails from './pages/TrainerClientDetails';
import ClientViewDiets from './pages/ClientViewDiets';
import ViewTrainers from './pages/ViewTrainers';
import ViewExercises from './pages/ViewExercises';
import ClientProfile from './pages/ClientProfile';


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
                <Route path="/profile" element={<ClientDetails/>} />
                <Route path="/workout-history" element={<WorkoutHistory/>} />
                <Route path="/pending-client-requests" element={<PendingRequests/>} />
                <Route path="/visualization" element={<Visualization/>} />
                <Route path="/diets" element={<Diets/>} />
                <Route path="/clients" element={<Clients/>} />
                <Route path="/view-diets" element={<ClientViewDiets/>} />
                <Route path="/request-trainer" element={<ViewTrainers/>} />
                <Route path="/search-exercise" element={<ViewExercises/>} />
                <Route path="/my-profile" element={<ClientProfile/>} />
                <Route path="/client/:clientEmail" element={<TrainerClientDetails />} />
                <Route element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    )
}