import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://liminalhome-be.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080')" }}>
      <nav className="bg-gray-800 text-white p-4 w-full flex justify-between">
      <Link to="/" className="text-lg">Home Exchange</Link>
        <div>
          <Link to="/login" className="px-4">Login</Link>
          <Link to="/register" className="px-4">Signup</Link>
        </div>
      </nav>
      <div className="bg-black bg-opacity-50 h-screen w-full flex flex-col items-center justify-center p-4">
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Login
      </button>
    </form>
    </div>
    </div>
  );
}

export default LoginForm;
