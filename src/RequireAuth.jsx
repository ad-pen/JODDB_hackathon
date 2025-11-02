import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user')); // adjust key if your app uses a different key
  } catch {
    return null;
  }
}

export default function RequireAuth({ allowedRoles = [], children }) {
  const location = useLocation();
  const user = getStoredUser();

  if (!user || !user.token) {
    // not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const role = (user.role || '').toString().toLowerCase();
  const allowed = allowedRoles.map(r => r.toLowerCase()).includes(role);

  if (!allowed) {
    // redirect to the appropriate default page for the user's role
    const defaultByRole = {
      planner: '/dashboard',
      supervisor: '/admin',
      technician: '/start-task',
    };
    const dest = defaultByRole[role] || '/login';
    return <Navigate to={dest} replace />;
  }

  return children;
}