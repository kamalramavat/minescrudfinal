import React from 'react'
import  { useState, useEffect } from 'react'
import Link from 'next/link'
import Pagination from './components/pagination';
import { getApiData } from '../pages/api/masterapi';


function SoftDelete() {
    const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 10 items per page
  const [editData, setEditData] = useState(null); // State to store data being edited

  //const itemsPerPage = 10;
  //const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ'; // Replace with your actual token
  //const apiUrl = 'https://mines-manager.up.railway.app';

  const apiUrl = 'http://13.233.251.86:8081';

  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';
  


  useEffect(() => {
    // Make a GET request to the API with the token
    fetch(`${apiUrl}/country/softDeleted`, {
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }


  // Display only the countries for the current page
  const currentCountries = filteredCountries.slice(startIndex, endIndex);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const restoreCountry = (countryId) => {
    // Make a PUT request to restore the country with the given countryId
    fetch(`${apiUrl}/country/restore/${countryId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the response as needed
        console.log('Country restored successfully', data);
        // Reload the page to reflect the updated data
       // window.location.reload();
      })
      .catch(error => {
        console.error('Error restoring country:', error);
      });
  };


  return (
    <div>


<div className="body d-flex py-lg-3 py-md-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="row text-center  py-2 no-bg bg-transparent d-flex align-items-center text-underline">
              <h3 className="fw-bold mb-0 dashboardheader"> Soft Delete Country Details</h3>
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
                {/* <div className="col-auto d-flex w-sm-100">
                  <Link
                    className="btn btn-primary btn-set-task w-sm-100"
                    href="/addCountry"
                  >
                    <i className="icofont-plus-circle me-2 fs-6" /> Add
                  </Link>
                </div> */}
                <div className="row align-items-center">
                <div className="border-0 mb-2">
                  <div className="card-header py-2 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <nav aria-label="breadcrumb">
                      {/* Breadcrumb code here */}
                    </nav>
                    <Link className="btn btn-primary btn-set-task w-sm-100" href="/country">
                      <i className="icofont-arrow-left fs-6" />
                      Back
                    </Link>
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
                onClick={() => restoreCountry(country.countryId)}
              >
                <i className="icofont-undo" style={{ fontSize: "medium" }} />
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
                                    {/* <form
                                    action="http://mines-manager.com/state/6"
                                    method="POST"
                                  >
                                    <input
                                      type="hidden"
                                      name="_token"
                                      defaultValue="H4fAs5D2XXn4tbeoGiWw79EQwxncOaGiKkvy33FM"
                                    />{" "}
                                    <input
                                      type="hidden"
                                      name="_method"
                                      defaultValue="DELETE"
                                    />{" "}
                                    <button
                                      type="submit"
                                      onclick="return confirm('Are you sure, You want to Delete this?')"
                                      className="btn btn-outline-secondary"
                                      tyle="border-top-left-radius: 0;border-bottom-left-radius: 0"
                                    >
                                      <i
                                        className="icofont-trash text-danger"
                                        style={{ fontSize: "medium" }}
                                      />
                                    </button>
                                  </form> */}
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
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
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

export default SoftDelete