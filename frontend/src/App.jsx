import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import CustomerDashboard from './customerdashboard';
import AdminDashboard from './admindashboard';
import EngineerDashboard from './engineerdashboard';
import Icdesign from './icdesigndashboard';
import DomainLeaderDashboard from './domainleader';

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/customer-dashboard' element={<CustomerDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/engineer-dashboard' element={<EngineerDashboard />} />
        <Route path='/icdesign-dashboard' element={<Icdesign />} />
        <Route path='/domainleader-dashboard' element={<DomainLeaderDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
