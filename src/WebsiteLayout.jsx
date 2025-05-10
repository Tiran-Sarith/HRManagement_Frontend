// WebsiteLayout.jsx
import React from 'react';
import Navbar from './Components/Navbar';
import Footer from "./Components/Footer";
import { Outlet } from 'react-router-dom';

export default function WebsiteLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen ">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
