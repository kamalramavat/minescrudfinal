// masterApi.js

const apiUrl = 'http://15.206.148.100:8081';

// Function to make a GET request
export const getApiData = async (country, token) => {
  try {
    const response = await fetch(`${apiUrl}/${country}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};




// // api.js
// import axios from 'axios';


// const apiUrl = 'http://13.233.154.100:8081';
// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';

// export const getAllCountries = async (token) => {
//   try {
//     const response = await axios.get(`${apiUrl}/country/all`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching countries:', error);
//     throw error;
//   }
// };

// export const getCountryById = async (countryId, token) => {
//   try {
//     const response = await axios.get(`${apiUrl}/country/${countryId}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching country with ID ${countryId}:`, error);
//     throw error;
//   }
// };

// export const updateCountry = async (countryId, updatedData, token) => {
//   try {
//     const response = await axios.put(`${apiUrl}/country/update/${countryId}`, updatedData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating country with ID ${countryId}:`, error);
//     throw error;
//   }
// };

// export const softDeleteCountry = async (countryId, token) => {
//   try {
//     const response = await axios.put(`${apiUrl}/country/softDelete/${countryId}`, null, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting country with ID ${countryId}:`, error);
//     throw error;
//   }
// };
