import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import RequireAuth from './RequireAuth';

// make sure this path matches your file
import Header from './templates/header';

// page imports
import LoginPage from './templates/login';
import StartTask from './templates/task_starting';
import SubmittedTasks from './templates/SubmittedTasks';
import AdminTasksPage from './templates/adminTaskspage';
import JobOrderProgressPage from './templates/jobOrderProgressBar';
import ProductivityPage from './templates/ProductivityPage';
import UtilizationPage from './templates/UtilizationPage';
import EfficiencyPage from './templates/EfficiencyPage';
import AllOrdersPage from './templates/allOrderPage';

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
      {/* public */}
      <Route path="/login" element={<LoginPage />} />

      {/* layout that always shows Header for authenticated pages */}
      <Route element={<MainLayout />}>
        {/* planner-only */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth allowedRoles={['planner']}>
              <JobOrderProgressPage />
            </RequireAuth>
          }
        />
        <Route
          path="/productivity"
          element={
            <RequireAuth allowedRoles={['planner']}>
              <ProductivityPage />
            </RequireAuth>
          }
        />
        <Route
          path="/utilization"
          element={
            <RequireAuth allowedRoles={['planner']}>
              <UtilizationPage />
            </RequireAuth>
          }
        />
        <Route
          path="/efficiency"
          element={
            <RequireAuth allowedRoles={['planner']}>
              <EfficiencyPage />
            </RequireAuth>
          }
        />

        {/* supervisor-only */}
        <Route
          path="/admin"
          element={
            <RequireAuth allowedRoles={['supervisor']}>
              <AdminTasksPage />
            </RequireAuth>
          }
        />

        {/* technician-only */}
        <Route
          path="/start-task"
          element={
            <RequireAuth allowedRoles={['technician']}>
              <StartTask />
            </RequireAuth>
          }
        />
        <Route
          path="/submitted-tasks"
          element={
            <RequireAuth allowedRoles={['technician']}>
              <SubmittedTasks />
            </RequireAuth>
          }
        />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

