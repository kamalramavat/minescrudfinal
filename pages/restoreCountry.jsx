// pages/restoreCountry.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const RestoreCountry = () => {
  const router = useRouter();
  const { countryId } = router.query;
  const [country, setCountry] = useState(null);

  useEffect(() => {
    // Fetch country details based on countryId
    const apiUrlget = 'http://13.233.251.199:8081';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g'; // Replace with your actual token

    fetch(`${apiUrlget}/country/softDeleted/${countryId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.status && data.data) {
          setCountry(data.data);
        } else {
          console.error('Country data not found in the API response');
        }
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
      });
  }, [countryId]);

  const handleRestore = () => {
    // Implement the logic to restore the country based on countryId
    const apiUrlrestore = 'http://13.233.251.199:8081';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g'; // Replace with your actual token

    // Check if the countryId exists
    if (!countryId) {
      console.error('Invalid countryId');
      return;
    }

    // Make a PUT request to the API for restoring the country
    fetch(`${apiUrlrestore}/country/restore/${countryId}`, {
      method: 'PUT', // Use the appropriate HTTP method for restoration
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the API response after successful restoration
        if (data && data.status === 'success') {
          console.log('Country restored successfully');
          // Redirect to the softDelete page or any other page as needed
          router.push('/softDelete');
        } else {
          console.error('Failed to restore country');
        }
      })
      .catch(error => {
        console.error('Error restoring country:', error);
      });
  };

  return (
    <div>
      <h1>Restore Country</h1>
      {country ? (
        <div>
          <p>Country ID: {country.countryId}</p>
          <p>Country Name: {country.countryName}</p>
          {/* Display other country details as needed */}
          <button onClick={handleRestore}>Restore Country</button>
          <Link href="/softDelete">
            <a>Back to Soft Delete</a>
          </Link>
        </div>
      ) : (
        <p>Loading country details...</p>
      )}
    </div>
  );
};

export default RestoreCountry;
