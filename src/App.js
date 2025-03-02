import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Map from './pages/Map';
import NotFound from './pages/NotFound';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Rating from './pages/Rating';
import Shop from './pages/Shop';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/profile" element={<Layout mainClear><Profile /></Layout>} />
        <Route path="/projects" element={<Layout dark><Projects /></Layout>} />
        <Route path="/project/:id" element={<Layout dark><Project /></Layout>} />
        <Route path="/registration" element={<Layout dark><Registration /></Layout>} />
        <Route path="/login" element={<Layout dark><Login /></Layout>} />
        <Route path="/map" element={<Layout noMainWrapper><Map /></Layout>} />
        <Route path="/rating" element={<Layout dark ><Rating /></Layout>} />
        <Route path="/shop" element={<Layout dark><Shop /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
