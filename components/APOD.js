'use client';
require('dotenv').config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RingLoader } from 'react-spinners';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const NASA_API_URL = 'https://api.nasa.gov/planetary/apod';

function APODViewer() {
  const [date, setDate] = useState(new Date());
  const [nasaData, setNasaData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAPODData = async (date) => {
    setIsLoading(true);
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const zonedDate = utcToZonedTime(date, userTimeZone);

      const response = await axios.get(NASA_API_URL, {
        params: {
          api_key: process.env.NEXT_PUBLIC_NASA_API_KEY,
          date: format(zonedDate, 'yyyy-MM-dd'),
        },
      });
      setNasaData(response.data);
    } catch (error) {
      console.error('Error fetching NASA data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = React.useState(false);

    const updateTarget = React.useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    React.useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, [width, updateTarget]);

    return targetReached;
  };

  const isBreakpoint = useMediaQuery(600);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAPODData(date);
  };

  useEffect(() => {
    fetchAPODData(date);
  }, []);

  return (
    <div className='pageContainer'>
      <h1 className='pageTitle'>
        Astronomy Picture of the Day (
        {nasaData ? nasaData.date : format(date, 'yyyy-MM-dd')})
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
      {isLoading ? (
        <div className='loader-container'>
          <RingLoader color='blueviolet' size={100} />
        </div>
      ) : (
        nasaData &&
        (nasaData.media_type === 'image' ? (
          isBreakpoint ? (
            <div>
              <h2 className='imageTitle'>{nasaData.title}</h2>
              <div className='image-container'>
                <img
                  className='APOD_image'
                  src={nasaData.url}
                  alt={nasaData.title}
                />
                <p>{nasaData.explanation}</p>
              </div>
            </div>
          ) : (
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
          )
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
        ))
      )}
    </div>
  );
}

export default APODViewer;
