import React from 'react'
import Link from 'next/link'

const editSubDistrict = () => {
  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
  <div className="container ">
    <form
      className="form form-horizontal"
      action="http://mines-manager.com/SubDistrict/16"
      id="form_basic_validation"
      method="POST"
      autoComplete="on"
    >
      <input
        type="hidden"
        name="_token"
        defaultValue="mM4LGyRmrDTHeENEs81iOdiojRTFxN1ge0PBKBzC"
      />{" "}
      <input type="hidden" name="_method" defaultValue="PUT" />{" "}
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
                      Update Sub District Details
                    </h3>
                  </div>
                  <div className="row align-items-center">
                    <div className="border-0 mb-2">
                      <div className="card-header py-2 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb fs-6">
                            <li className="breadcrumb-item">
                              <Link href="/mainmenu">
                                <i className="fa fa-home" /> Main Manu
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
                          href="/subDistrict"
                        >
                          <i className="icofont-arrow-left fs-6" />
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Row end  */}
                  <div className="card-body pt-0">
                    <div className="row g-3 align-items-center">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="name">
                          Country Name<span className="text-danger">*</span>
                        </label>
                        <select
                          name="countryId"
                          id="country_id"
                          onchange="getDistricts('state_id','district_id');"
                          className="w-100 form-select"
                          required=""
                        >
                          <option value="" disabled="disabled">
                            {" "}
                            - - Select Country - -{" "}
                          </option>
                          <option value={14} selected="">
                            India
                          </option>
                          <option value={1}>Pakistan</option>
                        </select>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="name">
                          State Name<span className="text-danger">*</span>
                        </label>
                        <select
                          name="state_id"
                          id="state_id"
                          onchange="getDistricts('state_id','district_id');"
                          className="w-100 form-select"
                          required=""
                        >
                          <option value="" disabled="disabled">
                            {" "}
                            - - Select State - -{" "}
                          </option>
                          <option value={14} selected="">
                            fgdhfghdf gfhdfghdfhdfgdhfhdfd
                          </option>
                          <option value={1}>Gujarat</option>
                        </select>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="district_id">
                          District Name<span className="text-danger">*</span>
                        </label>
                        <select
                          name="district_id"
                          id="district_id"
                          className="w-100 form-select"
                          required=""
                        >
                          <option value="" disabled="disabled">
                            {" "}
                            - - Select District - -
                          </option>
                          <option value={12} selected="">
                            ghgdsf gfhdgfdfg fghdfghdfghdd
                          </option>
                        </select>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <label htmlFor="subdistrictname">
                          Sub District Name
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          defaultValue="fddh gfhdgf ghdfghdf dfgfhgdfs"
                          type="text"
                          className="form-control  "
                          name="subdistrictname"
                          id="subdistrictname"
                          placeholder="Sub District Name"
                          maxLength={30}
                          required=""
                        />
                      </div>
                      <div className="justify-content-between d-flex">
                        <button
                          type="submit"
                          className="custome-btn btn btn-primary text-white"
                          style={{ width: 100, fontSize: 14 }}
                        >
                          Update
                          <i className="fa fa-send ms-2" />
                        </button>
                        <a
                          href="http://mines-manager.com/SubDistrict/16/edit"
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

export default editSubDistrict
