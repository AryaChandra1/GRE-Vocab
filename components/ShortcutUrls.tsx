import React, { useState, useEffect } from 'react';

export default function ShortcutUrls() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch('/api/shortcut-urls')
      .then(res => res.json())
      .then(data => setUrls(data));
  }, []);

  const handleAddUrl = (e) => {
    e.preventDefault();
    const newUrl = e.target.url.value;
    fetch('/api/shortcut-urls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newUrl }),
    })
      .then(res => res.json())
      .then(data => setUrls([...urls, data]));
    e.target.reset();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8">Shortcut URLs</h2>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddUrl}>
        <input type="url" name="url" required className="border rounded px-2 py-1" />
        <button type="submit" className="ml-2 px-4 py-2 bg-green-500 text-white rounded">Add URL</button>
      </form>
    </div>
  );
}