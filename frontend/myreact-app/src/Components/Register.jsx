import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 2000);
    } else {
      setMessage('Registration failed. Try a different username.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {message && <p className="mb-4 text-center text-blue-600">{message}</p>}
        <input 
          type="text" placeholder="Username" required
          className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <select 
          className="w-full p-2 border mb-6 rounded"
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Register
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}