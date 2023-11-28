import React from 'react'
import Link from 'next/link'

const vehicalType = () => {
  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
  <div className="container-fluid">
    <div className="row align-items-center">
      <div className="border-0 mb-4">
        <div className="row text-center py-2 no-bg bg-transparent d-flex align-items-center text-underline">
          <h3 className="fw-bold mb-0 dashboardheader">Vehicle Details</h3>
        </div>
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
          <div className="col-auto d-flex w-sm-100">
            <Link
              className="btn btn-primary btn-set-task w-sm-100"
              href="/addVehical"
            >
              <i className="icofont-plus-circle me-2 fs-6" /> Add
            </Link>
          </div>
        </div>
      </div>
    </div>{" "}
    {/* Row end  */}
    <div className="row g-3 mb-3">
      <div className="col-xl-12 col-lg-12 col-md-12">
        <div className="card">
          <div className="card-header py-3 d-flex justify-content-between border-bottom">
            <h6 className="mb-0 fw-bold">Vehicle Details</h6>
          </div>
          <div className="card-body table-responsive">
            <div
              id="myDataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap5 no-footer"
            >
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className="dataTables_length" id="myDataTable_length">
                    <label>
                      Show{" "}
                      <select
                        name="myDataTable_length"
                        aria-controls="myDataTable"
                        className="form-select form-select-sm"
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
                  <div id="myDataTable_filter" className="dataTables_filter">
                    <label>
                      Search:
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder=""
                        aria-controls="myDataTable"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-hover align-middle mb-0 data-table nowrap dataTable no-footer dtr-inline"
                    id="myDataTable"
                    style={{ width: "100%" }}
                    role="grid"
                    aria-describedby="myDataTable_info"
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="sorting_asc"
                          tabIndex={0}
                          aria-controls="myDataTable"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: 203 }}
                          aria-sort="ascending"
                          aria-label="No: activate to sort column descending"
                        >
                          No
                        </th>
                        <th
                          className="sorting"
                          tabIndex={0}
                          aria-controls="myDataTable"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: 1060 }}
                          aria-label="Name Of Vehicle: activate to sort column ascending"
                        >
                          Name Of Vehicle
                        </th>
                        <th
                          width="100px"
                          className="sorting"
                          tabIndex={0}
                          aria-controls="myDataTable"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: 100 }}
                          aria-label="Action: activate to sort column ascending"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr role="row" className="odd">
                        <td tabIndex={0} className="sorting_1">
                          1
                        </td>
                        <td>dsdsdsd yftytf tytyt tydstytsdysd ydstd</td>
                        <td className="d-flex">
                          <a
                            className="edit btn btn-outline-secondary"
                            style={{ display: "inline" }}
                            href="http://mines-manager.com/VehicleType/8/edit"
                          >
                            <i
                              className="icofont-edit text-success"
                              style={{ fontSize: "medium" }}
                            />
                          </a>
                          <form
                            action="http://mines-manager.com/VehicleType/8"
                            method="Post"
                          >
                            <input
                              type="hidden"
                              name="_token"
                              defaultValue="mM4LGyRmrDTHeENEs81iOdiojRTFxN1ge0PBKBzC"
                            />{" "}
                            <input
                              type="hidden"
                              name="_method"
                              defaultValue="DELETE"
                            />{" "}
                            <button
                              type="submit"
                              onclick="return confirm('Are you sure, You want to Delete this?')"
                              className="how btn btn-outline-secondary"
                            >
                              <i
                                className="icofont-trash text-danger"
                                style={{ fontSize: "medium" }}
                              />
                            </button>
                          </form>
                        </td>
                      </tr>
                    
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
                    Showing 1 to 5 of 5 entries
                  </div>
                </div>
                <div className="col-sm-12 col-md-7">
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="myDataTable_paginate"
                  >
                    {/* pagination here */}
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

export default vehicalType
