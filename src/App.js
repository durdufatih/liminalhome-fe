import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ListingForm from './components/ListingForm';
import Listings from './components/Listings';
import ListingsDisplay from './components/ListingDisplay';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/display" element={<ListingsDisplay />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create-listing" element={<ListingForm />} />
          <Route path="/create-listing/:id" element={<ListingForm />} />
          <Route path="/" element={<Listings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
