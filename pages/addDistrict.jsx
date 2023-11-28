import React from "react";
import Link from "next/link";

const addDistrict = () => {
  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="border-0 mb-2">
              <div className="row text-center  py-2 no-bg bg-transparent d-flex align-items-center text-underline">
                <h3 className="fw-bold mb-0 dashboardheader">
                  Add District Details
                </h3>
              </div>
            </div>
          </div>
          <form
            className="form form-horizontal"
            action="http://mines-manager.com/district"
            id="form_basic_validation"
            method="POST"
            name="add_permission"
            encType="multipart/form-data"
            autoComplete="on"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="mM4LGyRmrDTHeENEs81iOdiojRTFxN1ge0PBKBzC"
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
                        <div className="row align-items-center">
                          <div className="border-0 mb-2">
                            <div className="card-header py-2 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                              <nav aria-label="breadcrumb">
                                <ol className="breadcrumb fs-6">
                                  <li className="breadcrumb-item">
                                    <Link href="/mainmenu">
                                      <i className="fa fa-home" /> Main Menu
                                    </Link>
                                  </li>
                                  <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                  >
                                    <Link href="/masterdata">
                                      Master Data
                                    </Link>
                                  </li>
                                  <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                  >
                                    <Link href="/database">
                                      Database
                                    </Link>
                                  </li>
                                </ol>
                              </nav>
                              <Link
                                className="btn btn-primary btn-set-task w-sm-100"
                                href="/district"
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
                              <label htmlFor="country_id">
                                Country Name
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="country_id"
                                id="country_id"
                                className="w-100 form-select required autofocus "
                              >
                                <option value="" disabled="disabled">
                                  {" "}
                                  - - Select Country - -
                                </option>
                                <option value={14}>India</option>
                                <option value={1}>Pakistan</option>
                              </select>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <label htmlFor="state_id">
                                State Name<span className="text-danger">*</span>
                              </label>
                              <select
                                name="state_id"
                                id="state_id"
                                className="w-100 form-select required autofocus "
                              >
                                <option value="" disabled="disabled">
                                  {" "}
                                  - - Select State - -
                                </option>
                                <option value={14}>
                                  fgdhfghdf gfhdfghdfhdfgdhfhdfd
                                </option>
                                <option value={1}>Gujarat</option>
                              </select>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <label htmlFor="districtname">
                                District Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                defaultValue=""
                                type="text"
                                className="form-control  "
                                name="districtname"
                                id="districtname"
                                placeholder="District Name"
                                maxLength={30}
                                required=""
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
                                href="http://mines-manager.com/district/create"
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
  );
};

export default addDistrict;
