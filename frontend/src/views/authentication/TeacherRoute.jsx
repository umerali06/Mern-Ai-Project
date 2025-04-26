import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

const TeacherRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isTeacher = userInfo.role === 'teacher';

  return isTeacher ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
export default TeacherRoute;
