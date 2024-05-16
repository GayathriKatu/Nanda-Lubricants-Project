import React, { useState } from 'react';
import PrimaryButton from './Components/PrimaryButton';
import Image from './Images/oil boy2.png'; // Import your image

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Example: You can send a request to a server to authenticate the user
  };

  return (
    <div className="flex">
      <div className="w-1/3 bg-white flex items-center justify-center"> {/* Center image */}
        <img src={Image} alt="Logo" className="max-w-md " /> {/* Adjust max width as needed */}
      </div>
      <div className="flex-1 bg-gray-800 p-8 flex justify-center items-center">
        <div className="mb-64 w-full max-w-md ">
          <h2 className="mt-28 text-2xl font-semibold mb-12 text-white text-center">LOGIN</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 text-white" htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white" htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <PrimaryButton text="Login" type="submit" className="w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
