 import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  // Fetch Tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    const response = await fetch('https://scalable-rest-api-with-rbac-frontend-ifrn.onrender.com/v1/tasks', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      setTasks(await response.json());
    } else {
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:5000/api/v1/tasks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ title, description })
    });

    if (response.ok) {
      setMessage({ type: 'success', text: 'Task created successfully!' });
      setTitle('');
      setDescription('');
      fetchTasks(); // Refresh the list
    } else {
      setMessage({ type: 'error', text: 'Failed to create task.' });
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      setMessage({ type: 'success', text: 'Task deleted.' });
      fetchTasks(); // Refresh the list
    } else {
      setMessage({ type: 'error', text: 'Failed to delete task.' });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>
        <button 
          onClick={() => { localStorage.removeItem('token'); navigate('/'); }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Notification Message */}
      {message.text && (
        <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Add Task Form */}
      <form onSubmit={handleCreateTask} className="mb-8 p-4 bg-gray-50 rounded shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <input 
          type="text" placeholder="Task Title" required
          className="w-full p-2 border mb-3 rounded"
          value={title} onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Task Description" 
          className="w-full p-2 border mb-3 rounded"
          value={description} onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 ? <p className="text-gray-500">No tasks found. Create one above!</p> : tasks.map(task => (
          <div key={task._id} className="p-4 border rounded shadow-sm bg-white flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-600 mt-1">{task.description}</p>
            </div>
            <button 
              onClick={() => handleDeleteTask(task._id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
