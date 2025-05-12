import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/dashboard/dashboard';
import Login from './screens/login/login';
import Register from './screens/register/register';
import ResetPassword from './screens/reset-password/reset-password';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';
import { db } from './firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import Profile from './screens/profile/profile';
import PrivateRoute from './screens/private-route/private-route';
import Navbar from './screens/navbar/Navbar';
import Webinar from './screens/webinar/webinar';
import Terms from './screens/terms/terms';
import Privacy from './screens/privacy/privacy';
import SalaryCalculator from './screens/salaryCalculator/SalaryCalculator';
import ResumeBuilder from './screens/resume-builder/resume-builder';
import Search from './screens/search/search';
import IndustryInsights from './industry-insights/IndustryInsights';
import CareerAssessment from './screens/career-assessment/CareerAssessment';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User authentication state changed:", user); // Debug log
      setIsLoggedIn(!!user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          setHasProfile(userDoc.exists() && userDoc.data().profileCompleted);
        } catch (error) {
          console.error("Error checking profile:", error);
          setHasProfile(false);
        }
      } else {
        setHasProfile(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Show loading screen while determining auth state
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Dashboard /> : <Login />
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        {/* Ensure the profile route is commented out if disabled */}
        <Route path="/profile" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/webinar" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Webinar />
          </PrivateRoute>
        } />
        <Route path="/terms" element={
          <Terms />
        } />
        <Route path="/privacy" element={
          <Privacy />
        } />
        <Route path="/salary-calculator" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <SalaryCalculator />
          </PrivateRoute>
        } />
        <Route path="/resume-builder" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <ResumeBuilder />
          </PrivateRoute>
        } />
        <Route path="/search" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Search />
          </PrivateRoute>
        } />
        <Route path="/Industry-Insights" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <IndustryInsights />
          </PrivateRoute>
        } />
        <Route path="/career-assessment" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <CareerAssessment />
          </PrivateRoute>
        } />
        {/* Ensure the fallback route is defined last */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);