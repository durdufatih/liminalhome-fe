import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Listings() {
  const [listings, setListings] = useState([]);
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown açık/kapalı durumu için state
  const token = localStorage.getItem('token'); 
  const name = localStorage.getItem('name'); 
  let navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Dropdown durumunu değiştir
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı local storage'dan kaldır
    navigate("/login"); // Kullanıcıyı login sayfasına yönlendir
  };

  const fetchListings = async () => {
    try {
      const response = await axios.get('https://liminalhome-be.onrender.com/api/listings', {
        params: {
          city,
          startDate,
          endDate,
        },
      });
      setListings(response.data);
    } catch (error) {
      console.error('Failed to fetch listings', error);
    }
  };

  const handleSearch = () => {
    fetchListings();
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}>
      <nav className="bg-gray-800 text-white p-4 w-full flex justify-between">
        <Link to="/" className="text-lg">Home Exchange</Link>
        <div>
          {token ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="px-4 py-2 rounded text-white bg-gray-700 hover:bg-gray-600">Welcome {name}</button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                  <Link to="/display" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Homes</Link>
                  <Link to="/create-listing" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Create Listing</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4">Login</Link>
              <Link to="/register" className="px-4">Signup</Link>
            </>
          )}
        </div>
      </nav>
      <div className="bg-black bg-opacity-50 h-screen w-full flex flex-col items-center justify-center p-4">
        <h2 className="text-5xl font-bold text-white mb-8 text-center">Find Your Perfect Home Exchange</h2>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <div className="mb-4">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 mb-2 border rounded bg-white text-gray-700"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              <option value="">Select a city</option>
              <option value="London">London</option>
              <option value="Paris">Paris</option>
              <option value="Berlin">Berlin</option>
              <option value="Madrid">Madrid</option>
              <option value="Rome">Rome</option>
              <option value="Vienna">Vienna</option>
              <option value="Amsterdam">Amsterdam</option>
              <option value="Brussels">Brussels</option>
              <option value="Stockholm">Stockholm</option>
              <option value="Oslo">Oslo</option>
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 mb-2 border rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 mb-2 border rounded"
            />
          </div>
          <button onClick={handleSearch} className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700">
            Search
          </button>
        </div>
        <ul className="w-full max-w-4xl mt-8">
          {listings.map((listing) => (
            <li key={listing._id} className="mb-4 p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row">
              
              <img src={`https://via.placeholder.com/150`} alt={listing.title} className="w-full md:w-48 h-48 object-cover rounded-lg md:mr-4" />
              <div className="flex flex-col justify-between mt-4 md:mt-0">
                <div>
                  
                  <h3 className="text-xl font-bold text-blue-600">{listing.title}</h3>
                  <p className="text-gray-700">{listing.description}</p>
                  <p className="text-gray-500">{listing.city}</p>
                </div>
                <img src={listing.user.profilePicture || 'https://via.placeholder.com/150'} alt={listing.user.name} className="w-12 h-12 object-cover rounded-full md:mr-4" />
                <p className="text-gray-500">
                  Available from {new Date(listing.availableDates.startDate).toLocaleDateString()} to {new Date(listing.availableDates.endDate).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Listings;
