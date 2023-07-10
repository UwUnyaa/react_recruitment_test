import {useState, useEffect} from 'react';

// Fetch a resource with a GET request, then parse it as JSON.
//
// Returns the response or null while fetching, or if an error occurs.
export const useGetJSON = (url) => {
  const [JSON, setJSON] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    
    fetch(url, { signal })
      .then((response) => response.json())
      .then(setJSON)
      .catch(() => setJSON(null));

    // Abort the request when cleaning up
    return () => controller.abort();
  }, [url]);

  return JSON;
};

export default useGetJSON;
