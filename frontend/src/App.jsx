import React, { useState } from 'react';

const App = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 rounded-lg bg-gray-50 border-2 border-gray-200">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Form Submission</h1>
      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        <div>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="message">
            Message:
            <input
              type="text"
              id="message"
              name="message"
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
              value={formData.message}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit" className="rounded-md bg-green-50 px-2.5 py-1.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-100 w-full">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {response && (
        <div className="bg-white border-2 border-gray-200 p-4 rounded-md mt-8">
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
