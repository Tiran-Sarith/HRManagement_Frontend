// AdminLayout.jsx
import React from 'react';
import MainHR from "./HRPages/MainHR"; // assumes this wraps internal routes
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return <MainHR />;
}
