'use client';
require('dotenv').config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

function APODViewer() {
  const [date, setDate] = useState(new Date());
  const [nasaData, setNasaData] = useState(null);

  const fetchAPODData = async (date) => {
    try {
      const response = await axios.get(NASA_API_URL, {
        params: {
          api_key: process.env.NEXT_PUBLIC_NASA_API_KEY,
          date: date.toISOString().slice(0, 10),
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

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    fetchAPODData(date);
  }, []);

  return (
    <div className='pageContainer'>
      <h1 className='pageTitle'>
        Astronomy Picture of the Day (
        {nasaData ? nasaData.date : date.toISOString().slice(0, 10)})
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='datePickerContainer'>
          <label>Select a Date: </label>
          <div className='datePickerWrapper'>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat='yyyy-MM-dd'
            />
          </div>
          <button type='submit'>Get APOD</button>
        </div>
        <div>
          <p id='warningMssg'>
            {date > new Date()
              ? 'Selected date must be on or before today'
              : null}
          </p>
        </div>
      </form>
      {nasaData &&
        (nasaData.media_type === 'image' ? (
          <div>
            <h2 className='imageTitle'>{nasaData.title}</h2>
            <div className='image-container'>
              <img
                className='APOD_image'
                src={nasaData.url}
                alt={nasaData.title}
              />
              <div className='image-overlay'>
                <p>{nasaData.explanation}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className='imageTitle'>{nasaData.title}</h2>
            <div className='image-container'>
              <a id='videoLink' href={nasaData.url} target='_blank'>
                Video Link
              </a>
              <p>{nasaData.explanation}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default APODViewer;
