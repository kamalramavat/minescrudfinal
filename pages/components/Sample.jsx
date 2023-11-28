import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Country = () => {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 items per page
  const [editData, setEditData] = useState(null); // State to store data being edited
  const [importedFile, setImportedFile] = useState(null);
  const [importedCountryCount, setImportedCountryCount] = useState(0);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);


  //const itemsPerPage = 10;
  // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ'; // Replace with your actual token
  // const apiUrl = 'https://mines-manager.up.railway.app';

  const apiUrl = 'http://3.109.208.66:8081';
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';
  

  useEffect(() => {
    // Make a GET request to the API with the token
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
          console.log(countryData);
          setCountries(countryData);
        } else {
          console.error('Data not found in the API response');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
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

  const confirmDelete = (stateId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      handleDelete(stateId);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

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

  const handleUpdate = () => {
    // Make an update request to your backend API to update the data
    const apiUrl = `https://your-backend-api/update/${editData.countryId}`; // Replace with your actual API endpoint

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include your authentication token if required
      },
      body: JSON.stringify(editData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Data successfully updated
        console.log(`Data with stateId ${editData.countryId} updated successfully`);

        // Now, update the state to refresh the UI
        fetchData();

        // Close the edit modal
        closeEditModal();
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  const openEditModal = () => {
    // Code to show your edit modal (you can use a state variable for modal visibility)
    console.log('Edit modal opened');
  };

  const closeEditModal = () => {
    // Code to hide your edit modal (you can use a state variable for modal visibility)
    console.log('Edit modal closed');
    // Optionally, you can reset the editData state
    setEditData(null);
  };


  // new code for edit with put
  const updateCountryOnServer = (countryId, updatedCountryName) => {
    const apiUrl = 'http://13.233.251.199:8081';
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

  const handleEdit = (country) => {
    const updatedCountryName = window.prompt('Enter the new country name:', country.countryName);

    if (updatedCountryName !== null) {
      const updatedCountries = countries.map((c) =>
        c.countryId === country.countryId ? { ...c, countryName: updatedCountryName } : c
      );

      setCountries(updatedCountries);
      updateCountryOnServer(country.countryId, updatedCountryName);
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
      //setImportedCountryCount(data.totalCount);
      //alert(`Successfully imported ${data.totalCount} countries.`);
      alert(`Successfully imported countries.`);
  
      // Fetch the updated list of countries
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
      // Clear the file input
      setImportedFile(null);
      // Close the modal
      setIsImportModalOpen(false);
    }
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




  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="row text-center  py-2 no-bg bg-transparent d-flex align-items-center text-underline">
              <h3 className="fw-bold mb-0 dashboardheader">Country Details</h3>
            </div>
            <div className="border-0 mb-4">
              <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb fs-5">
                    <li className="breadcrumb-item">
                      <Link href="/mainmenu">
                        <i className="fa fa-home" /> Main Manu
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
                <div className="row justify-content-end">
    <div className="col-md-3">
      <Link className="btn btn-primary m-lg-1 btn-set-task w-100" href="/addCountry">
        <i className="icofont-plus-circle me-2 fs-6" /> Add
      </Link>
    </div>
    <div className="col-md-4">
      <Link className="btn btn-primary m-lg-1 btn-set-task w-100" href="/softDelete">
        <i className="bi bi-archive"></i> Soft Delete List
      </Link>
    </div>
    <div className="col-md-2">
      
      <DropdownButton id="dropdown-basic-button" title="Export" className="w-100">
        <Dropdown.Item href="#/action-1">Excel</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Csv</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Pdf</Dropdown.Item>
      </DropdownButton>
      
    </div>
    <div className="col-md-3">
    <button className="btn btn-outline-primary" onClick={() => setIsImportModalOpen(true)}>Import</button>

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
          <input type="file" accept=".csv" className="form-control mx-auto" style={{ backgroundColor: 'white', color: 'black' }} onChange={handleFileUpload} />

          {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
        </div>
      </div>
      </div>

      {/* Modal Footer */}
      <div className="modal-footer">
        {/* Close button to close the modal */}
        <button type="button" className="btn btn-secondary" onClick={() => setIsImportModalOpen(false)}>Close</button>
        {/* Button to trigger the import process */}
        <button type="button" className="btn btn-primary" onClick={handleImport}>Import</button>
      </div>
    </div>
  </div>
</div>
      
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
                        <p>No data available</p>
                      ) : (
                        <div className="row">
                          <div className="col-sm-12">
                            <table id="myDataTable" className="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline" style={{ width: "100%" }} role="grid" aria-describedby="myDataTable_info">
                              <thead>
                                <tr role="row">
                                  <th
                                    style={{ width: 576 }}
                                    className="sorting_asc"
                                    tabIndex={0}
                                    aria-controls="myDataTable"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                    aria-label="#: activate to sort column descending"
                                  >
                                    #
                                  </th>
                                  <th
                                    style={{ width: 576 }}
                                    className="sorting_asc"
                                    tabIndex={0}
                                    aria-controls="myDataTable"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                    aria-label="#: activate to sort column descending"
                                  >
                                    Country Name
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
                                    style={{ width: 65 }}
                                    className="sorting"
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
                                    <td>{country.countryId}</td>
                                    <td >{country.countryName}</td>
                                    {/* <td >{country.stateName}</td> */}
                                    {/* <td >{country.status ? "Active" : "Inactive"}</td> */}


                                    <td className="btn-group" role="group">
                                      <button
                                        className="edit btn btn-outline-secondary"
                                        style={{ display: "inline" }}
                                        onClick={() => handleEdit(country)}
                                      >
                                        <i className="icofont-edit text-success" style={{ fontSize: "medium" }} />
                                      </button>

                                      <Link
                                        className="edit btn btn-outline-secondary"
                                        style={{ display: "inline" }}
                                        onClick={() => confirmDelete(country.countryId)}
                                        href="#"

                                      >
                                        <i
                                          className="icofont-trash text-danger"
                                          style={{ fontSize: "medium" }}
                                        />
                                      </Link>

                                    </td>
                                  </tr>


                                ))}

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
