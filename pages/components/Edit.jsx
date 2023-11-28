import React, { useState, useEffect,  useRef  } from 'react';
import Link from 'next/link';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const Sample = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editData, setEditData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedCountryName, setEditedCountryName] = useState('');
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [selectedImportOption, setSelectedImportOption] = useState('');
  const fileInputRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importedData, setImportedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ'; // Replace with your actual token
  const apiUrl = 'https://mines-manager.up.railway.app';

  useEffect(() => {
    // Make a GET request to the API with the token
    fetch(`${apiUrl}/country/all`, {
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

  const handleEdit = (country) => {
    setEditData(country);
    setEditedCountryName(country.countryName);
    setIsPopupOpen(true);
  };

  const handleSave = () => {
    updateCountryOnServer(editData.countryId, editedCountryName);
    setIsPopupOpen(false);
  };

  const updateCountryOnServer = (countryId, updatedCountryName) => {
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
        fetchCountries(token, apiUrl, setCountries);
      })
      .catch(error => {
        console.error('Error updating country data on the server:', error);
      });
  };
//Import code


  // Functions to handle popup operations
  const openImportPopup = () => {
    setIsImportPopupOpen(true);
  };

  const closeImportPopup = () => {
    setIsImportPopupOpen(false);
  };

  const handleImportOptionChange1 = (option) => {
    setSelectedImportOption(option);
  };

  // Function to handle import operation
  const handleImport1 = () => {
    // Check the selected import option and execute the corresponding handler
    switch (selectedImportOption) {
      case 'excel':
        handleExcelImport();
        break;
      // Add more import options if needed
      default:
        break;
    }

    // Close the import popup after handling the import
    closeImportPopup();
  };

  // Function to handle Excel import
  const handleExcelImport2 = () => {
    // Get the selected file from the file input
    const file = fileInputRef.current.files[0];

    // Create a FileReader object and set the onload event handler
    const reader = new FileReader();
    reader.onload = (e) => {
      // Convert the file contents to an array buffer
      const data = new Uint8Array(e.target.result);

      // Parse the Excel file data into a workbook object
      const workbook = XLSX.read(data, { type: 'array' });

      // Process the workbook data as needed
      // ...
    };

    // Read the file contents as an array buffer
    reader.readAsArrayBuffer(file);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openImportModal = () => {
    setIsImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportModalOpen(false);
  };

  const handleImportOptionChange = (option) => {
    setSelectedImportOption(option);
  };

  
  const handleExcelImport1 = () => {
    // Example: Reading the imported Excel file
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      // Process the workbook data as needed
    };

    reader.readAsArrayBuffer(file);
  };



  // Export as Excel
  const exportToExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(countries);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'countries' + fileExtension);
  };

  // Export as PDF
  const exportToPDF = () => {
    const input = document.getElementById('export-content');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('countries.pdf');
    });
  };

  // Export as CSV
  const exportToCSV = () => {
    const csvData = 'Country Name, Status\n' + countries.map(country => `${country.countryName},${country.status ? "Active" : "Inactive"}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'countries.csv');
  };


  //Import Excel Data code
  const handleExcelImport = () => {
    const file = fileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Display the imported data for preview
      setImportedData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleInsertData = () => {
    
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ'; // Replace with your actual token
  const apiUrladd = 'https://mines-manager.up.railway.app';
  

    // Insert the imported data into the database using API
    fetch(`${apiUrladd}/country/UploadCsv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(importedData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data inserted successfully:', data);
        // Add any additional handling as needed
      })
      .catch(error => {
        console.error('Error inserting data:', error);
      });
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
              <div className="col-auto d-flex w-sm-100">
                <Link
                  className="btn btn-primary btn-set-task w-sm-100"
                  href="/addCountry">
                  <i className="icofont-plus-circle me-2 fs-6" /> Add
                </Link>
                <Link
                  className="btn btn-primary btn-set-task w-sm-100"
                  href="/softDelete">
                  <i class="bi bi-archive"></i> Soft Delete List
                </Link>
               {/* Export and Import Buttons */}
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="btn-group">
            <button className="btn btn-outline-secondary" onClick={exportToExcel}>
              Export to Excel
            </button>
            <button className="btn btn-outline-secondary" onClick={exportToPDF}>
              Export to PDF
            </button>
            <button className="btn btn-outline-secondary" onClick={exportToCSV}>
              Export to CSV
            </button>
            <button className="btn btn-outline-secondary" onClick={openImportModal}>
              Import
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: isEditModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Country</h5>
              <button type="button" className="btn-close" onClick={closeEditModal}></button>
            </div>
            <div className="modal-body">
              {/* Add your edit form or content here 
              <button
                                      className="edit btn btn-outline-secondary"
                                      style={{ display: "inline" }}
                                      onClick={() => handleEdit(country)}
                                    >
                                      <i className="icofont-edit text-success" style={{ fontSize: "medium" }} />
                                    </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeEditModal}>
                Save changes
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Import Modal */}
      <div className="modal" tabIndex="-1" role="dialog" style={{ display: isImportModalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Import Data</h5>
              <button type="button" className="btn-close" onClick={closeImportModal}></button>
            </div>
            <div className="modal-body">
              <h6>Select Import Option</h6>
              {/* Add your import options here */}
              {/* ... (existing code) */}
              <br />
              <input type="file" ref={fileInputRef} />
              {importedData && (
                <div>
                  <h6>Preview Imported Data</h6>
                  <pre>{JSON.stringify(importedData, null, 2)}</pre>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={handleExcelImport}>
                Import
              </button>
              {importedData && (
                <button type="button" className="btn btn-success" onClick={handleInsertData}>
                  Insert Data
                </button>
              )}
              <button type="button" className="btn btn-secondary" onClick={closeImportModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>


              </div>
            </div>
          </div>
        </div>
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

                              <th
                                style={{ width: 723 }}
                                className="sorting"
                                tabIndex={0}
                                aria-controls="myDataTable"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="State Name: activate to sort column ascending"
                              >
                                Status
                              </th>
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
                                <td >{country.status ? "Active" : "Inactive"}</td>


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

export default Sample;
