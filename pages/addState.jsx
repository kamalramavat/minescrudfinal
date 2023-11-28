import Link from 'next/link'
import React from 'react'

const addState = () => {
  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
  <div className="container ">
    <form
      className="form form-horizontal"
      action="http://mines-manager.com/state"
      id="form_basic_validation"
      method="POST"
      autoComplete="on"
    >
      <input
        type="hidden"
        name="_token"
        defaultValue="H4fAs5D2XXn4tbeoGiWw79EQwxncOaGiKkvy33FM"
      />{" "}
      <div className="row">
        <div
          className="col-lg-12 card p-0 m-0"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="card">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card-body ">
                  <div className="row text-center  py-2 no-bg bg-transparent d-flex align-items-center text-underline">
                    <h3 className="fw-bold mb-0 dashboardheader">
                      Add State Details
                    </h3>
                  </div>
                  <div className="row align-items-center">
                    <div className="border-0 mb-2">
                      <div className="card-header py-2 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb fs-6">
                            <li className="breadcrumb-item">
                              <a href="http://mines-manager.com/mainmenu">
                                <i className="fa fa-home" /> Main Manu
                              </a>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              <a href="http://mines-manager.com/masterdata">
                                Master Data
                              </a>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              <a href="http://mines-manager.com/masterdashboard">
                                Database
                              </a>
                            </li>
                          </ol>
                        </nav>
                        <Link
                          className="btn btn-primary btn-set-task w-sm-100"
                          href="/state"
                        >
                          <i className="icofont-arrow-left fs-6" />
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row g-3 align-items-center">
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="statename">
                          Country Name<span className="text-danger">*</span>
                        </label>
                        <input
                          defaultValue=""
                          type="text"
                          className="form-control "
                          name="countryName"
                          id="statename"
                          placeholder="Country Name"
                          maxLength={30}
                          required=""
                          autofocus=""
                        />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="statename">
                          State Name<span className="text-danger">*</span>
                        </label>
                        <input
                          defaultValue=""
                          type="text"
                          className="form-control "
                          name="stateName"
                          id="statename"
                          placeholder="State Name"
                          maxLength={30}
                          required=""
                          autofocus=""
                        />
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="statename">
                          Status<span className="text-danger">*</span>
                        </label>
                        <input
                          defaultValue=""
                          type="text"
                          className="form-control "
                          name="status"
                          id="statename"
                          placeholder="status"
                          maxLength={30}
                          required=""
                          autofocus=""
                        />
                      </div>
                      <div className="justify-content-between d-flex">
                        <button
                          type="submit"
                          className="custome-btn btn btn-primary text-white"
                          style={{ width: 100, fontSize: 14 }}
                          disabled=""
                        >
                          Save
                          <i className="fa fa-send ms-2" />
                        </button>
                        <a
                          href="http://mines-manager.com/state/create"
                          className="btn btn-danger text-white"
                        >
                          Reset
                          <i className="fa fa-refresh ms-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}

export default addState
