import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Pagination from './components/pagination';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getApiData } from '../pages/api/masterapi';
import { handleExportToExcel } from '../pages/api/masterapi';
import 'jspdf-autotable';
import { Modal, Button, Form } from 'react-bootstrap';



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




  //const itemsPerPage = 10;
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ'; // Replace with your actual token
  // const apiUrl = 'https://mines-manager.up.railway.app';

  const apiUrl = 'http://15.206.148.100:8081';
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryData = await getApiData('country', token);
        setCountries(countryData);

        console.log(countryData);
        // Set state or perform other actions with the data
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




  // new code for edit with put
  const updateCountryOnServer = (countryId, updatedCountryName) => {
    const apiUrl = 'http://15.206.148.100:8081';
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
        // Perform any additional actions or handle the response as needed
      })
      .catch(error => {
        console.error('Error updating country data on the server:', error);
      });
  };

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
      fetchData(); // Fetch fresh data after updating the country
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

  const handleClick = async () => {

    const apiUrl = 'http://15.206.148.100:8081';

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';


    try {
      const updateUrl = `${apiUrl}/country/${countryId}`;

      // Make a fetch request to your updated server endpoint to get the countryName
      const response = await fetch(updateUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        credentials: 'include',

      });

      if (!response.ok) {
        throw new Error('Failed to fetch country information');
      }

      const data = await response.json();
      const countryName = data.countryName;

      // Show an alert with the fetched country name
      alert(`Clicked on ${countryName}`);

      // If you also want to trigger the modal, you can call the handleShowViewModal function
      handleShowViewModal({ countryId, countryName });
    } catch (error) {
      console.error(error);
      alert('Failed to fetch country information');
    }
  };


  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="row text-center py-2 no-bg bg-transparent d-flex align-items-center text-underline">
              <h3 className="fw-bold mb-0 dashboardheader">Country Details</h3>
            </div>
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb fs-5">
                    <li className="breadcrumb-item">
                      <Link href="/mainmenu">
                        <i className="fa fa-home" /> Main Menu
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link href="/masterdata">Master Data</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link href="/database">Database</Link>
                    </li>
                  </ol>
                </nav>

                <div className='container-left'>
                  <div className="row justify-content-end align-items-center">
                    <div className="col-md-3 mb-2">
                      <Link className="btn btn-primary mx-1 btn-set-task w-100" href="/addCountry">
                        <i class="bi bi-box-arrow-in-down me-2"></i> Add
                      </Link>
                    </div>
                    <div className="col-md-3 mb-2">
                      <Link className="btn btn-primary mx-1 btn-set-task w-100" href="/softDelete">
                        <i className="bi bi-archive"></i> Bin
                      </Link>
                    </div>
                    <div className="col-md-2 mb-2">
                      <DropdownButton id="dropdown-basic-button" title={<><span style={{ marginRight: '5px' }}>&#x25BC;</span>Export</>} className="w-100">
                        <Dropdown.Item onClick={handleExportToExcel}>Excel</Dropdown.Item>
                        <Dropdown.Item onClick={handleExportToCSV}>Csv</Dropdown.Item>
                        <Dropdown.Item onClick={handleExportToPDF}>Pdf</Dropdown.Item>
                      </DropdownButton>
                    </div>

                    <div className="col-md-1 mb-2"></div> {/* Add an empty column for spacing */}

                    <div className="col-md-3 mb-2">
                      <button className="btn btn-primary mx-1 btn-set-task w-100" onClick={() => setIsImportModalOpen(true)}> <i className="bi bi-box-arrow-up me-2"></i>Import</button>
                    </div>
                    <div className="col-md-3 mb-2">
                      <div className="col-md-1 mb-2"></div> {/* Add an empty column for spacing */}

                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          {/* Import Modal */}
          <div className={`modal ${isImportModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isImportModalOpen ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" style={{ backgroundColor: '' }}>
                {/* Modal Header */}
                <div className="modal-header" style={{ backgroundColor: '#113c62', color: 'white' }}>
                  <h5 className="modal-title"  >Import Countries</h5>
                  <button type="button" className="btn-close" onClick={() => setIsImportModalOpen(false)} style={{ color: 'white', border: 'none', background: 'transparent', fontSize: '1.5rem' }}>&times;</button>
                </div>

                {/* Modal Body */}
                <div className="modal-body text-center">
                  <div className="mb-3">

                    <h5>You can download a sample of the .CSV file here:</h5>
                    {/* Button to download sample CSV */}
                    <button className="btn btn-primary" onClick={handleDownloadSampleCSV}>Download CSV</button>
                  </div>

                  <hr />
                  <div className="modal-body text-center">
                    <div className="mb-3">

                      <h5>Import Countries.csv file from existing file</h5>
                      {/* File input for choosing a CSV file */}
                      {/* <input type="file" accept=".csv" className="form-control mx-auto" style={{ backgroundColor: 'white', color: 'black' }} onChange={handleFileUpload} /> */}
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="form-control mx-auto" style={{ backgroundColor: 'white', color: 'black' }} />

                      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                  {/* Close button to close the modal */}
                  <button type="button" className="btn btn-secondary" onClick={() => setIsImportModalOpen(false)}>Close</button>
                  {/* Button to trigger the import process */}
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleImport}
                    disabled={loading}
                  >
                    Import
                  </Button>
                  {loading && <p>Loading...</p>}

                </div>
              </div>
            </div>
          </div>
          {/* Import Success Modal */}
          <Modal show={showImportSuccessModal} onHide={handleCloseImportSuccessModal} centered backdrop="static" keyboard={false}>
            <Modal.Header style={{ backgroundColor: '#113c62', color: 'white', paddingBottom: '0' }}>
              <Modal.Title>Import Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {importSuccessMessage || 'Data has been imported successfully.'}
            </Modal.Body>
            <Modal.Footer style={{ paddingTop: '0' }}>
              <Button variant="success" onClick={handleCloseImportSuccessModal} style={{ backgroundColor: '#113c62', color: 'white' }}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Display total imported country count */}
          {importedCountryCount > 0 && (
            <div className="alert alert-success mt-3" role="alert">
              Successfully imported {importedCountryCount} countries.
            </div>
          )}
          <div className="row g-3 mb-3">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header py-3 d-flex justify-content-between border-bottom">
                  <h6 className="mb-0 fw-bold">Country Details</h6>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="myDataTable_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div
                            className="dataTables_length"
                            id="myDataTable_length"
                          >
                            <label>
                              Show{" "}
                              <select
                                name="state_tbl_length"
                                aria-controls="state_tbl"
                                className="form-select form-select-sm"
                                // onChange={handlePageSizeChange}
                                // value={pageSize}
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>{" "}
                              entries
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div
                            id="myDataTable_filter"
                            className="dataTables_filter"
                          >
                            <label>
                              Search:
                              <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder=""
                                aria-controls="myDataTable"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}

                              />
                            </label>

                          </div>
                        </div>
                      </div>
                      {currentCountries.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh' }}>
                          <p>No data available</p>
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-sm-12">
                            <table id="myDataTable" className="table table-bordered table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline" style={{ width: "100%" }} role="grid" aria-describedby="myDataTable_info">
                              <thead>
                                <tr role="row" >
                                  <th

                                    style={{ width: 576, border: "1px solid #dee2e6", padding: "8px" }}
                                    // className="sorting_asc"
                                    tabIndex={0}
                                    aria-controls="myDataTable"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                    aria-label="#: activate to sort column descending"
                                    onClick={() => handleSort('countryId')}

                                  >
                                    Country Id
                                    {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                                  </th>
                                  <th
                                    style={{ width: 576, border: "1px solid #dee2e6", padding: "8px" }}
                                    //className={`sorting_${sortOrder}`}
                                    tabIndex={0}
                                    aria-controls="myDataTable"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort={sortOrder}
                                    aria-label="#: activate to sort column descending"
                                    onClick={() => handleSort('countryName')}
                                    >
                                    Country Name
                                    {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                                  </th>

                                  {/* <th
                                  style={{ width: 723 }}
                                  className="sorting"
                                  tabIndex={0}
                                  aria-controls="myDataTable"
                                  rowSpan={1}
                                  colSpan={1}
                                  aria-label="State Name: activate to sort column ascending"
                                >
                                  Status
                                </th> */}
                                  <th
                                    style={{ width: 65, borderBottom: "2px solid #dee2e6", padding: "8px" }}
                                    //className="sorting"
                                    tabIndex={0}
                                    aria-controls="myDataTable"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Actions: activate to sort column ascending"
                                  >
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="mb-4">

                                {currentCountries.map((country, index) => (
                                  <tr role="row" className="even" key={`${country.countryId}-${index}`}>
                                    <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>{country.countryId}</td>
                                    <td style={{ border: "1px solid #dee2e6", padding: "8px" }}>{country.countryName}</td>
                                    <td className="btn-group" style={{ border: "1px solid #dee2e6", padding: "8px" }} role="group">
                                      <button
                                        className="edit btn btn-outline-secondary"
                                        style={{ display: "inline" }}
                                        onClick={() => handleShowEditModal(country)}
                                      >
                                        <i class="bi bi-pen"></i>

                                        {/* <i className="icofont icofont-edit text-success" style={{ fontSize: "medium" }} /> */}
                                      </button>

                                      <button
                                        className="delete btn btn-outline-secondary"
                                        style={{ display: "inline" }}
                                        onClick={() => handleShowDeleteModal(country)}
                                      >
                                        <i class="bi bi-trash-fill"></i>
                                      </button>
                                      <button
                                        className="view btn btn-outline-secondary"
                                        style={{ display: "inline" }}
                                        onClick={handleClick}
                                      >
                                        <i class="bi bi-display"></i>
                                      </button>

                                    </td>
                                  </tr>
                                ))}
                                {/* Modal or other component to display the countryName */}
                                {selectedCountry && (
                                  <div>
                                    <h2>Selected Country: {selectedCountry}</h2>
                                    {/* Other modal content */}
                                  </div>
                                )}
                                {/* Edit Modal */}
                                <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                                  <Modal.Header style={{ backgroundColor: '#113c62', color: 'white', paddingBottom: '0' }}>
                                    <Modal.Title>Edit Country</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form>
                                      <Form.Group controlId="formCountryName">
                                        <Form.Label>Country Name</Form.Label>
                                        <Form.Control
                                          type="text"
                                          placeholder="Enter country name"
                                          value={updatedCountryName}
                                          onChange={(e) => handleCountryNameChange(e.target.value)}
                                          className={isValidCountryName(updatedCountryName) ? '' : 'error'}
                                          title={isValidCountryName(updatedCountryName) ? '' : 'Invalid country name'}
                                        />
                                      </Form.Group>

                                    </Form>
                                  </Modal.Body>
                                  <Modal.Footer style={{ paddingTop: '0' }}>
                                    <Button variant="secondary" onClick={handleCloseEditModal} style={{ backgroundColor: '#113c62', color: 'white' }}>
                                      Cancel
                                    </Button>
                                    <Button variant="primary" onClick={handleUpdateCountry} style={{ backgroundColor: '#113c62', color: 'white' }}>
                                      Update
                                    </Button>
                                  </Modal.Footer>
                                </Modal>

                                {/* Delete Modal */}
                                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                                  <Modal.Header style={{ backgroundColor: '#113c62', color: 'white', paddingBottom: '0' }}>
                                    <Modal.Title>Confirm Delete</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Are you sure you want to delete {countryToDelete?.countryName}?
                                  </Modal.Body>
                                  <Modal.Footer style={{ paddingTop: '0' }}>
                                    <Button variant="secondary" onClick={handleCloseDeleteModal} style={{ backgroundColor: '#113c62', color: 'white' }}>
                                      Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleConfirmDelete} style={{ backgroundColor: '#113c62', color: 'white' }}>
                                      Delete
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                                {/* Modal for viewing country details */}
                                <Modal
                                  isOpen={isViewModalOpen}
                                  onRequestClose={handleCloseViewModal}
                                  contentLabel="View Country Modal"
                                // Add your modal styling here
                                >
                                  {selectedCountry && (
                                    <div>
                                      {/* Display country details in the modal */}
                                      <h2>Country Details</h2>
                                      <p>Country Name: {selectedCountry.countryName}</p>

                                      {/* Add more details as needed */}

                                      <button onClick={handleCloseViewModal}>Close</button>
                                    </div>
                                  )}
                                </Modal>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      <div className="row">
                        <div className="col-sm-12 col-md-5">
                          <div
                            className="dataTables_info"
                            id="myDataTable_info"
                            role="status"
                            aria-live="polite"
                          >
                            {/* {`Showing 1 to 10 of ${users.totalElements} entries`} */}
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-7">
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="myDataTable_paginate"
                          >
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
                              countries={currentCountries}
                              sortOrder={sortOrder}
                              handleSort={handleSort}
                            />
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Country
