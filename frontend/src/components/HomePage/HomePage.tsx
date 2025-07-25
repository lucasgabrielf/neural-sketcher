import { useState, useEffect } from 'react'
import "./HomePage.css"

function HomePage() {
  // In a React component (e.g., App.js)
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/data')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='homepage-container'>
      <h1>Testing the connection to the backend!</h1>
      <p>{message}</p>
    </div>
  );
}

export default HomePage
