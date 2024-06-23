import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function ListingForm() {
  const location = useLocation(); // useLocation hook'u kullanılır
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown açık/kapalı durumu için state
  const [isUpdating, setIsUpdating] = useState(false); // Güncelleme durumunu kontrol etmek için yeni state
  const token = localStorage.getItem('token'); 
  const name = localStorage.getItem('name'); 
  let navigate = useNavigate();

  // Verileri form state'lerine yüklemek için useEffect kullanılır
  useEffect(() => {

    if (location.state && location.state.data) {
      const { title, description, city, availableDates } = location.state.data;
      setTitle(title);
      setDescription(description);
      setCity(city);
      if (availableDates) {
        const formattedStartDate = new Date(availableDates.startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(availableDates.endDate).toISOString().split('T')[0];
        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
      }
      setIsUpdating(true); // Veri varsa güncelleme moduna geç
    }
  }, [location.state]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Dropdown durumunu değiştir
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Token'ı local storage'dan kaldır
    navigate("/login"); // Kullanıcıyı login sayfasına yönlendir
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://liminalhome-be.onrender.com/api/listings/${location.state.data._id}`, // Güncellenecek ilanın ID'si
        {
          title,
          description,
          city,
          availableDates: {
            startDate,
            endDate,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Listing updated successfully!');
      // İlanın detay sayfasına yönlendirme yapılabilir
    } catch (error) {
      alert('Listing update failed!');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://liminalhome-be.onrender.com/api/listings',
        {
          title,
          description,
          city,
          availableDates: {
            startDate,
            endDate,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Listing saved successfully!');
      // İlanın detay sayfasına yönlendirme yapılabilir
    } catch (error) {
      alert('Listing save failed!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdating) {
      handleUpdate(); // Güncelleme modunda ise güncelleme işlemini yap
    } else {
      handleSave(); // Güncelleme modunda değilse yeni ilan oluşturma işlemini yap
    }
    navigate('/display');
  };

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Listing' : 'Create Listing'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-4 border rounded"
        required
      ></textarea>
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
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        {isUpdating ? 'Update Listing' : 'Create Listing'}
      </button>
    </form>
    </div>
    </div>
  
  );
}

export default ListingForm;
