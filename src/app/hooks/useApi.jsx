import { useEffect } from 'react';
import { addRequestToQueue, processQueue } from '../utils/requestQueue';

const useApi = () => {
  const sendRequest = async (url, options) => {
    if (!navigator.onLine) {
      await addRequestToQueue({ url, options });
      console.log('Request added to queue due to no internet connection');
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error making API request:', error);
    }
  };

  useEffect(() => {
    window.addEventListener('online', processQueue);

    return () => {
      window.removeEventListener('online', processQueue);
    };
  }, []);

  return { sendRequest };
};

export default useApi;
