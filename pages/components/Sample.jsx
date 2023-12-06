import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getApiData } from '../api/masterapi';
import { handleExportToExcel } from '../api/masterapi';
import 'jspdf-autotable';
import { Modal, Button, Form } from 'react-bootstrap';
import Cors from 'cors';



const Country = (countryId, handleShowViewModal, handleCloseViewModal) => {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 items per page
  const [editData, setEditData] = useState(null); // State to store data being edited
  const [importedFile, setImportedFile] = useState(null);
  const [importedCountryCount, setImportedCountryCount] = useState(0);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedCountryName, setUpdatedCountryName] = useState('');
  const [countryToEdit, setCountryToEdit] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showImportSuccessModal, setShowImportSuccessModal] = useState(false);
  const [importSuccessMessage, setImportSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  const [totalElements, setTotalElements] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const [seconds, setSeconds] = useState(5);


  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setEnabled(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const handleDelete1 = () => {
    // Add your delete logic here
    console.log('Delete button clicked!');
  };


  //const itemsPerPage = 10;
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ'; // Replace with your actual token
  // const apiUrl = 'https://mines-manager.up.railway.app';

  const apiUrl = 'http://15.207.20.189:8081';
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryData = await getApiData('country', token, {
          sortBy: 'updatedAt',
          sortDirection: 'desc',
          itemsPerPage,
          currentPage,
          searchTerm,
        });
    
        console.log('Full API response:', countryData);
    
        if (countryData.data && Array.isArray(countryData.data)) {
          const sortedData = countryData.data.sort((a, b) => {
            // Assuming updatedAt is a valid field in your data
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          });
    
          setCountries(sortedData);
    
          console.log('Sorted Data:', sortedData);
          // Set state or perform other actions with the data
        } else {
          console.error('Invalid or missing data in API response');
          // Handle the case where the data is not as expected
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };

    fetchData();
  }, [token, itemsPerPage, currentPage, searchTerm]);


  // Filter the data based on the search term
  const filteredCountries = countries.filter(country => {
    return country.countryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  // Determine the range of countries to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Display only the countries for the current page
  const currentCountries = filteredCountries.slice(startIndex, endIndex);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  // const confirmDelete = (stateId) => {
  //   const isConfirmed = window.confirm("Are you sure you want to delete?");
  //   if (isConfirmed) {
  //     handleDelete(stateId);
  //   }
  // };

  // Assuming countryID is declared somewhere else in the code

  const handlePageChange = (page) => {
    // Use countryID as needed
    setCurrentPage(page);
  }



  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCountryToDelete(null);
  };

  const handleShowDeleteModal = (country) => {
    setCountryToDelete(country);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (countryToDelete) {
      handleCloseDeleteModal();

      handleDelete(countryToDelete.countryId);
    }
  };

  const handleDelete = (countryId) => {
    // Make a DELETE request to your backend API to delete the data
    //const apiUrl = `https://your-backend-api/delete/${stateId}`; // Replace with your actual API endpoint
    // Replace with your actual token
    //const apiUrl = 'https://mines-manager.up.railway.app/country/softDelete/${stateId}`;




    fetch(`${apiUrl}/country/softDelete/${countryId}`, {
      method: 'PUT'
      ,
      headers: {
        'Authorization': `Bearer ${token}` // Include your authentication token if required
      }
    })
      // .then(response => {
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
      //   return response.json();
      // })
      .then(data => {
        // Data successfully deleted
        console.log(`Data with countryId ${countryId} deleted successfully`);

        // Now, update the state to refresh the UI
        // You might want to re-fetch the data or update the state based on your application logic
        // For simplicity, let's assume you have a function named fetchData to re-fetch the data
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const fetchData = () => {
    // Implement your logic to fetch the updated data from the API
    // and update the state to refresh the UI
    console.log('Fetching updated data...');

    // Example: Assuming you have a function setCountries to update the state
    // setCountries(updatedData);
  };

  // Function to handle pagination button click
  // const handlePageClick = (page) => {
  //   setCurrentPage(page);
  // };

  // // Generate an array of 5 page numbers for display, centered around the active page
  // const pageNumbers = [];
  // const maxPagesToShow = 5;

  // let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  // let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  // if (totalPages <= maxPagesToShow) {
  //   startPage = 1;
  //   endPage = totalPages;
  // } else if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
  //   startPage = 1;
  //   endPage = maxPagesToShow;
  // } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
  //   startPage = totalPages - maxPagesToShow + 1;
  //   endPage = totalPages;
  // }

  // for (let i = startPage; i <= endPage; i++) {
  //   pageNumbers.push(i);
  // }





  //Edit Data code
  // const handleEdit = (country) => {
  //   // Set the data being edited and open the edit modal
  //   setEditData(country);
  //   openEditModal();
  // };

  // reload data
  const reloadData = () => {
    // Refetch data from the API
    fetch(`${apiUrl}/country`, {
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
          // Extract the list of countries from the "data" property
          const countryData = data.data;
          setCountries(countryData);
        } else {
          console.error('Data not found in the API response');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // new code for edit with put
  const updateCountryOnServer = (countryId, updatedCountryName) => {
    const apiUrl = 'http://15.207.20.189:8081';
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';

    const updateUrl = `${apiUrl}/country/${countryId}`;

    fetch(updateUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ countryName: updatedCountryName })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(`Data with countryId ${countryId} updated successfully on the server`);

        // Fetch and display updated country data without reloading the whole page
        reloadData();
      })
      .catch(error => {
        console.error('Error updating country data on the server:', error);
      });
  };
  // const fetchAndDisplayCountryData = () => {
  //   const countryListContainer = document.getElementById('countryName'); // Replace with the actual ID of your container

  //   // Make a request to fetch the updated country data
  //   fetch(apiUrl + '/country', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       // Assuming data is an array of country objects
  //       // Update the DOM with the new data
  //       countryListContainer.innerHTML = ''; // Clear existing content

  //       data.forEach(country => {
  //         const countryElement = document.createElement('div');
  //         countryElement.textContent = country.countryName;
  //         // Add more logic to update other properties as needed

  //         countryListContainer.appendChild(countryElement);
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Error fetching and displaying country data:', error);
  //     });
  // };
  const fetchBinElements = async () => {
    try {
      const response = await fetch(`${apiUrl}/country/softDeleted`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTotalElements(data.totalElements);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchBinElements();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCountryToEdit(null);
    setUpdatedCountryName('');
  };

  const handleShowEditModal = (country) => {
    setCountryToEdit(country);
    setUpdatedCountryName(country.countryName);
    setShowEditModal(true);
  };

  const handleUpdateCountry = () => {
    if (countryToEdit && updatedCountryName !== '' && isValidCountryName(updatedCountryName)) {
      updateCountryOnServer(countryToEdit.countryId, updatedCountryName);
      handleCloseEditModal();
      reloadData(); // Fetch fresh data after updating the country
    } else {
      console.error('Invalid country name');
      // You may want to display an error message to the user here
    }
  };
  const handleEdit = (country) => {
    const updatedCountryName = country.countryName;

    if (updatedCountryName !== null && isValidCountryName(updatedCountryName)) {
      const updatedCountries = countries.map((c) =>
        c.countryId === country.countryId ? { ...c, countryName: updatedCountryName } : c
      );

      setCountries(updatedCountries);
      updateCountryOnServer(country.countryId, updatedCountryName);
    } else {
      console.error('Invalid country name');
      // You may want to display an error message to the user here
    }
  };
  const isValidCountryName = (countryName) => {
    // Use regex to allow only A-Z and a-z characters
    const regex = /^[a-zA-Z ]{3,}$/;
    return regex.test(countryName);
  };
  const handleCountryNameChange = (inputValue) => {
    // Use regex to allow only alphabets
    const alphabetRegex = /^[a-zA-Z ]{3,}$/;

    if (alphabetRegex.test(inputValue) || inputValue === '') {
      // Only update the state if the input is valid or empty
      setUpdatedCountryName(inputValue);
    }
  };


  // Initialize the Cors middleware
  const initMiddleware = (handler) => {
    return Cors({
      methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
      origin: true,
      credentials: true,
    });
  };






  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImportedFile(file);
  };

  const handleImport = async () => {
    if (!importedFile) {
      alert('Please select a file to import.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', importedFile);

    try {
      const response = await fetch(`${apiUrl}/country/UploadCsv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Import failed');
      }

      const data = await response.json();
      setImportedCountryCount(data.totalCount);
      setImportSuccessMessage(data.message);

      // Show the Import Success Modal
      setShowImportSuccessModal(true);

      const updatedResponse = await fetch(`${apiUrl}/country`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated data');
      }

      const updatedData = await updatedResponse.json();
      if (updatedData && updatedData.status && updatedData.data) {
        setCountries(updatedData.data);
      } else {
        console.error('Data not found in the updated API response');
      }
    } catch (error) {
      console.error('Error importing countries:', error);
      alert('Failed to import countries. Please try again.');
    } finally {
      setImportedFile(null);
      setIsImportModalOpen(false);
      setLoading(false);
    }
  };


  const handleCloseImportSuccessModal = () => {
    setShowImportSuccessModal(false);
    setImportSuccessMessage('');
    // Clear the file input value
    fileInputRef.current.value = '';
  };



  const handleDownloadSampleCSV = () => {
    const sampleData = [
      { countryName: 'Country Nine', status: 'true' },
      { countryName: 'Country Ten', status: 'true' },
      // Add more sample data as needed
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'csv', bookSST: false, type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    FileSaver.saveAs(data, 'countries.csv');
  };
  const handleExportToExcel = () => {
    // Extract countryId and countryName from the filtered countries array
    const filteredDataToExport = filteredCountries.map((country) => ({
      countryId: country.countryId,
      countryName: country.countryName,
      updatedAt: country.updatedAt
    }));

    if (filteredDataToExport.length === 0) {
      alert("No data available for export");
      return;
    }

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredDataToExport);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'FilteredCountryData');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'filtered_country_data.xlsx');
  };

  const handleExportToCSV = () => {
    // Extract countryId and countryName from the filtered countries array
    const filteredDataToExport = filteredCountries.map((country) => ({
      countryId: country.countryId,
      countryName: country.countryName,
      updatedAt: country.updatedAt
    }));

    if (filteredDataToExport.length === 0) {
      alert("No data available for export");
      return;
    }

    // Create a CSV string
    const csvData = [
      ['Country ID', 'Country Name'],
      ...filteredDataToExport.map((country) => [country.countryId, country.countryName]),
    ];

    // Convert the CSV data to a Blob
    const csvBlob = new Blob([csvData.map((row) => row.join(',')).join('\n')], {
      type: 'text/csv;charset=utf-8',
    });

    // Save the Blob as a CSV file
    FileSaver.saveAs(csvBlob, 'filtered_country_data.csv');
  };



  const handleExportToPDF = () => {
    // Extract countryId and countryName from the filtered countries array
    const filteredDataToExport = filteredCountries.map((country) => ({
      countryId: country.countryId,
      countryName: country.countryName,
      updatedAt: country.updatedAt

    }));

    // Create a PDF document
    const pdfDoc = new jsPDF();
    pdfDoc.text('Filtered Country Data', 10, 10);

    // Add table headers
    const headers = ['Country ID', 'Country Name'];
    const rows = filteredDataToExport.map((country) => [country.countryId, country.countryName]);

    // Use autoTable from jspdf-autotable
    pdfDoc.autoTable({
      head: [headers],
      body: rows,
    });

    // Save the PDF
    pdfDoc.save('filtered_country_data.pdf');
  };

  // Code for Sorting Data
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedCountries = [...countries].sort((a, b) => {
      if (column === 'countryId') {
        return newSortOrder === 'asc' ? a.countryId - b.countryId : b.countryId - a.countryId;
      } else if (column === 'countryName') {
        const nameA = a.countryName.toUpperCase();
        const nameB = b.countryName.toUpperCase();
        return newSortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      }
      return 0;
    });

    setCountries(sortedCountries);
  };

  const handleShowViewModal1 = (country) => {
    setSelectedCountry(country.countryName);
    // Additional logic for displaying the modal can be added here
  };
  const handleCloseModal = () => {
    // Implement your logic to close the modal
    // This might involve setting a state variable or calling a function from your modal component
    // For example, if you are using React state:
    // setModalOpen(false);

    // If you have a function in your modal component to handle closing:
    // closeModal();

    // You can also pass handleCloseViewModal as a prop to the modal component
    // and call it directly from there.
    handleCloseViewModal();
  };

  const fetchDataView = async (countryId) => {
    try {
      const response = await fetch(`${apiUrl}/country`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data && data.status && data.data) {
        const countryData = data.data;
        setCountries(countryData);

        // Find the selected country based on countryId (assuming it's present in the fetched data)
        const selectedCountry = countryData.find(country => country.countryId === countryId);

        if (selectedCountry) {
          setSelectedCountry(selectedCountry);
          setShowModal(true);
        } else {
          console.error('Selected country not found in the data');
        }
      } else {
        console.error('Data not found in the API response');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCloseModalview = () => {
    setShowModal(false);
    setSelectedCountry(null);
  };




  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryId}>
            <p>{country.countryName}</p>
            <p>{country.status ? 'Active' : 'Inactive'}</p>
            {/* Render other country details as needed */}
          </li>
        ))}
      </ul>

      <div>
      <button onClick={handleDelete1} disabled={!isEnabled}>
        Delete{seconds}
      </button>
      <p>
       
      </p>
    </div>
    </div>
  )
}

export default Country
