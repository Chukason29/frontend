// frontend/pages/index.js
"use client";
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [response, setResponse] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://warehouse.trendsaf.co/api/index.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ status: 'error', message: 'Request failed' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br/>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        /><br/><br/>

        <label htmlFor="email">Email:</label><br/>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        /><br/><br/>

        <button type="submit">Send</button>
      </form>

      {response && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Status:</strong> {response.status}<br/>
          <strong>Message:</strong> {response.message}
        </div>
      )}
    </div>
  );
}
