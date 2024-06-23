import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';

function ListingsDisplay() {
    const [listings, setListings] = useState([]); // Listeleri saklamak için state
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

  const navigateToUpdate = (id, data) => {
    navigate(`/create-listing/${id}`, { state: { data } });
  };

  const fetchListings = async () => {
    try {
        const response = await axios.get('https://liminalhome-be.onrender.com/api/listings/homes', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setListings(response.data); 
    } catch (error) {
        console.error('Error fetching listings:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`https://liminalhome-be.onrender.com/api/listings/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(`Listing with ID: ${id} deleted successfully`);
        fetchListings(); // Sayfayı güncellemek için listelemeleri tekrar çek
        // Silme işlemi başarılı olduğunda sayfayı yenileyebilir veya gerekli işlemleri yapabilirsiniz
    } catch (error) {
        console.error('Error deleting listing:', error);
        // Hata durumunda kullanıcıya bilgi verebilirsiniz
    }
  };

    useEffect(() => {
        fetchListings();
    }, []);

    return (
      <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center">
        <nav className="bg-gray-800 text-white p-4 w-full flex justify-between">
          <Link to="/" className="text-lg">
            Home Exchange
          </Link>
          <div>
            {token ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-4 py-2 rounded text-white bg-gray-700 hover:bg-gray-600"
                >
                  Welcome {name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                    <Link
                      to="/display"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      My Homes
                    </Link>
                    <Link
                      to="/create-listing"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Create Listing
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4">
                  Login
                </Link>
                <Link to="/register" className="px-4">
                  Signup
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className="bg-black bg-opacity-50 h-screen w-full flex flex-col items-center justify-center p-4">
          <h1 className="mb-4">Listings</h1>
          <div className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <li
                  key={listing._id}
                  className="bg-blue-100 rounded-lg border border-blue-300 shadow-lg overflow-hidden"
                >
                  <div className="p-4 h-3/5">
                    <h2 className="text-2xl font-bold text-blue-800">
                      {listing.title}
                    </h2>
                    <p className="text-blue-600 h">{listing.description}</p>
                  </div>
                  <div className="p-4 bg-blue-200 flex justify-between items-center">
                    <div>
                      <p className="text-blue-700">{listing.city}</p>
                      <p className="text-sm text-blue-600">
                        Available from
                        <span className="font-semibold text-blue-900">
                          {new Date(
                            listing.availableDates.startDate
                          ).toLocaleDateString()}
                        </span>{" "}
                        to
                        <span className="font-semibold text-blue-900">
                          {new Date(
                            listing.availableDates.endDate
                          ).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => navigateToUpdate(listing._id, listing)}
                        className="text-blue-700 hover:text-blue-900 p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 112.036 2.036L12 16.5V21h4.5l6.378-6.378a2.5 2.5 0 00-3.536-3.536L12 16.5l-4.5-4.5H3v-1a2 2 0 012-2h3.5l1-1m0 0L21 3m0 0L3 21"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
}

export default ListingsDisplay;
