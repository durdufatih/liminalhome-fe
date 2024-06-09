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
    <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Listings</h2>
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <button onClick={handleSearch} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Search
        </button>
      </div>
      <ul>
        {listings.map((listing) => (
          <li key={listing._id} className="mb-4 p-4 border-b">
            <h3 className="text-xl font-bold">{listing.title}</h3>
            <p>{listing.description}</p>
            <p>{listing.city}</p>
            <p>
              Available from {new Date(listing.availableDates.startDate).toLocaleDateString()} to {new Date(listing.availableDates.endDate).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listings;
