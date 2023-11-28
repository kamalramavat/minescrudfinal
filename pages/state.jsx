import React, { useEffect, useState, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchState, deleteState, setPageSize, setSearchQuery, setPage } from "../features/userDetailSlice";
import Pagination from "../pages/components/pagination";
import Link from "next/link";

const State = () => {
  const dispatch = useDispatch();
  const { users, loading, page, pageSize, totalPages, searchQuery } = useSelector((state) => state.app);
 
  const [searchData, setSearchData] = useState([]);

  



  useEffect(() => {
    // Fetch data when the component mounts or when the page and pageSize change.
    dispatch(fetchState({ page, pageSize }));
    console.log("all state page rendered")
  }, [dispatch, page, pageSize]);

  const stateList = useMemo(() => {
    return users.data|| [];
  }, [users.data, page, pageSize]);

  const handleSearch = async (query) => {
    dispatch(setSearchQuery(query))
    // Make an API call to fetch search results based on the query.
    const response = await fetch(`https://mines-manager.up.railway.app/state/search?keyword=${query}`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY5ODIzMzA0MywiZXhwIjozODQ1NzE2NjkwfQ.9NGroKV45c2A56PpaA_xkbPI5QTd_E1XdoF1Ru1wU1jIGT2UBYG4sH4mXMUDjBAooqsUVBSzE0xKpr89KcFwmQ",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Update the search results in the Redux store
      setSearchData(data.data)
      dispatch(setPage(0));
      console.log(searchData)
    }
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    dispatch(setPageSize(newPageSize));
    dispatch(setPage(1)); // Reset to the first page when changing page size.
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleDelete = async (stateId) => {
    try {
      // Dispatch the deleteState async thunk with the stateId as a parameter
      const action = deleteState({ stateId });
      const resultAction = await dispatch(action);
  
      if (deleteState.fulfilled.match(resultAction)) {
        // Handle successful delete
        // You can perform additional actions, e.g., refetch the data after a successful delete
        dispatch(fetchState({ page, pageSize, searchQuery }));
      } else {
        // Handle the error, which is stored in resultAction.payload
        console.error("Error deleting state:", resultAction.payload);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="row text-center  py-2 no-bg bg-transparent d-flex align-items-center text-underline">
              <h3 className="fw-bold mb-0 dashboardheader">State Details</h3>
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
                    href="/addState"
                  >
                    <i className="icofont-plus-circle me-2 fs-6" /> Add
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header py-3 d-flex justify-content-between border-bottom">
                  <h6 className="mb-0 fw-bold">State Details</h6>
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
                                onChange={handlePageSizeChange}
                                value={pageSize}
                              >
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
                                
                                onChange={(e) => handleSearch(e.target.value)}
                              />
                            </label>
                            
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <table
                            id="myDataTable"
                            className="table table-hover align-middle mb-0 nowrap dataTable no-footer dtr-inline"
                            style={{ width: "100%" }}
                            role="grid"
                            aria-describedby="myDataTable_info"
                          >
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
                                  State Name
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
                              {stateList
                                // .filter((item) =>
                                //   item.countryName
                                //     .toLowerCase()
                                //     .includes(searchInput.toLowerCase())
                                // )
                                .map((item) => (
                                  <tr
                                    role="row"
                                    className="odd"
                                    key={item.stateId}
                                  >
                                    <td tabIndex={0} className="sorting_1">
                                      {item.stateId}
                                    </td>
                                    <td>{item.countryName}</td>
                                    <td>{item.stateName}</td>
                                    <td>
                                      {item.status ? "Active" : "Inactive"}
                                    </td>
                                    <td className="btn-group" role="group">
                                      <Link
                                        className="edit btn btn-outline-secondary"
                                        style={{ display: "inline" }}
                                        href={`/editState?id=${item.stateId}`}
                                      >
                                        <i
                                          className="icofont-edit text-success"
                                          style={{ fontSize: "medium" }}
                                        />
                                      </Link>
                                      <Link
                                        className="edit btn btn-outline-secondary"
                                        style={{ display: "inline" }}
                                        href="#"
                                        onClick={handleDelete}                                    
                            
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
                      <div className="row">
                        <div className="col-sm-12 col-md-5">
                          <div
                            className="dataTables_info"
                            id="myDataTable_info"
                            role="status"
                            aria-live="polite"
                          >
                            {`Showing 1 to 10 of ${users.totalElements} entries`}
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-7">
                          <div
                            className="dataTables_paginate paging_simple_numbers"
                            id="myDataTable_paginate"
                          >
                            <Pagination
                              currentPage={page}
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
  );
};


export default State;
