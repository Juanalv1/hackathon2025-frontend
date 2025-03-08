let db;

const openDatabase = () => {
  if (db) return Promise.resolve(db);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open('apiRequestQueue', 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = event => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = event => {
      reject(event.target.error);
    };
  });
};

export const addRequestToQueue = async (request) => {
  const db = await openDatabase();
  const transaction = db.transaction('requests', 'readwrite');
  const store = transaction.objectStore('requests');
  store.add(request);
};

export const processQueue = async () => {
  const db = await openDatabase();
  const transaction = db.transaction('requests', 'readonly');
  const store = transaction.objectStore('requests');

  const allRequests = store.getAll();

  allRequests.onsuccess = async () => {
    const requests = allRequests.result;

    for (const request of requests) {
      try {
        await fetch(request.url, request.options);
        const deleteTransaction = db.transaction('requests', 'readwrite');
        const deleteStore = deleteTransaction.objectStore('requests');
        deleteStore.delete(request.id);
      } catch (error) {
        console.error('Error processing request:', error);
      }
    }
  };
};

self.addEventListener('online', processQueue);

// Agrega esta función para obtener todas las solicitudes en cola
export const getQueuedRequests = async () => {
  const db = await openDatabase();
  const transaction = db.transaction('requests', 'readonly');
  const store = transaction.objectStore('requests');

  return new Promise((resolve, reject) => {
    const allRequests = store.getAll();

    allRequests.onsuccess = () => {
      resolve(allRequests.result);
    };

    allRequests.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
