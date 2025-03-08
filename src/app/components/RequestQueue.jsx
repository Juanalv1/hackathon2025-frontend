// components/RequestQueue.js

import React, { useState, useEffect } from 'react';
import { getQueuedRequests } from '../utils/requestQueue';

const RequestQueue = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchQueuedRequests = async () => {
      const queuedRequests = await getQueuedRequests();
      setRequests(queuedRequests);
    };

    fetchQueuedRequests();
  }, []);

  return (
    <div>
      <h2>Solicitudes en cola</h2>
      <ul>
        {requests.map((request, index) => (
          <li key={index}>
            <strong>URL:</strong> {request.url}
            <br />
            <strong>Método:</strong> {request.options.method}
            <br />
            <strong>Cuerpo:</strong> {JSON.stringify(request.options.body)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestQueue;
