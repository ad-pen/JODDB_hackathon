import React from 'react';
// 1. Import Routes, Route, and Outlet
import { Routes, Route, Outlet } from 'react-router-dom';

// 2. Import all your page components
import Header from './templates/header'; 
import LoginPage from './templates/login'; // Assuming you have this
import StartTask from './templates/task_starting'; // Your main task page
import SubmittedTasks from './templates/SubmittedTasks'; // Your submitted tasks page

/**
 * This component wraps all pages that SHOULD have the header.
 * The <Outlet> component renders the active nested route (e.g., StartTask).
 */
const MainLayout = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

/**
 * The main App component now defines the route structure.
 */
function App() {
  return (
    <Routes>
      {/* Route 1: The Login Page.
        This route is standalone and will NOT render the <MainLayout>.
      */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Route 2: The Main App Layout.
        This route uses <MainLayout> as its element.
        All nested routes (children) will render INSIDE the <Outlet> in MainLayout.
      */}
      <Route element={<MainLayout />}>
        <Route path="/start-task" element={<StartTask />} />
        <Route path="/submitted-tasks" element={<SubmittedTasks />} />
        {/* You can add more routes here, e.g., for Notifications */}
        {/* <Route path="/notifications" element={<NotificationsPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;

