'use client';
require('dotenv').config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

function APODViewer() {
  const [date, setDate] = useState('');
  const [nasaData, setNasaData] = useState(null);
  console.log('API Key:', process.env.NASA_API_KEY);
  const fetchAPODData = async (selectedDate) => {
    try {
      const response = await axios.get(NASA_API_URL, {
        params: {
          api_key: process.env.NEXT_PUBLIC_NASA_API_KEY,
          date: selectedDate,
        },
      });
      setNasaData(response.data);
    } catch (error) {
      console.error('Error fetching NASA data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAPODData(date);
  };

  useEffect(() => {
    // Fetch initial APOD data when the component mounts (e.g., for today's date)
    const today = new Date().toISOString().slice(0, 10);
    fetchAPODData(today);
  }, []);

  return (
    <div>
      <h1>Astronomy Picture of the Day Viewer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a Date (YYYY-MM-DD):
          <input
            type='text'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button type='submit'>Get APOD</button>
      </form>
      {nasaData && (
        <div>
          <h2>{nasaData.title}</h2>
          <img
            className='APOD_image'
            src={nasaData.hdurl}
            alt={nasaData.title}
          />
          <p>{nasaData.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default APODViewer;
