import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listings() {
  const [listings, setListings] = useState([]);
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      <div className="bg-black bg-opacity-50 h-screen w-full flex flex-col items-center justify-center p-4">
        <h2 className="text-5xl font-bold text-white mb-8 text-center">Find Your Perfect Home Exchange</h2>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <div className="mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full p-3 mb-2 border rounded"
            />
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
