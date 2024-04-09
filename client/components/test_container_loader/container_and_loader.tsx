// just a dummy file to show the container running and the loader working
import React, { useState } from 'react';

import Loader from '../loader/loader';

const DummyContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Function to call the API endpoint
  const fetchDataFromAPI = async () => {
    try {
      // Display loader component
      setLoading(true);
      console.log('Fetching data from API...');
      console.log('loading: ', loading);
      await new Promise((resolve) => setTimeout(resolve, 4000));

      // Call the API endpoint
      // change according to the API needed
      const response = await fetch(
        'http://host.docker.internal:3000/api/dummy_container'
      );
      //   const data = await response.json(); // Uncomment this line if the API returns JSON data

      // Process the data (if needed)
      //   console.log('Data from API:', data);

      // Hide loader component
      setLoading(false);
      console.log('loading: ', loading);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Hide loader component in case of error
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading && <button onClick={fetchDataFromAPI}>Fetch Data</button>}
      {loading && <Loader progressValues={[40, 70, 100]} />}{' '}
      {/* Render loader component if loading is true */}
    </div>
  );
};

export default DummyContainer;
