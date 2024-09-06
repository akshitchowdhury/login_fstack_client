import React, { useState } from 'react';

const InputForm = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const[isFavorite, setIsFavorite] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();
    
    const submitData = async () => {
      try {
        const formData = new FormData();

        formData.append('username', userName);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('password', password);
        formData.append('image', image);
        formData.append('isFavorite', isFavorite);

        const submitData = await fetch('https://login-fstack-server.vercel.app/login', {
          method: 'POST',
          body: formData, 
        });

        const dataFlow = await submitData.json();

        alert('User created successfully');
        window.location.reload();
      } catch (error) {
        alert('Failed to create user: ' + error);
      }
    };

    submitData();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmission} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Create a new User</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter User Name"
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Set User Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={() => setIsFavorite(!isFavorite)}
          />
          <label className="ml-2">Favorite</label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
