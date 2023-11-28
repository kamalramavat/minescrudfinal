import React from "react";
import Link from "next/link";

const database = () => {
  return (
    <div>
      <div className="auto-container">
        <div className="row mt">
          <h2 className="mt-3 mb-4 text-center dashboardheader">Database</h2>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-5 fs-5">
            <li className="breadcrumb-item">
              <Link href="/mainmenu">
                <i className="fa fa-home" /> / Main Menu
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link href="/masterdata">Master Data</Link>
            </li>
          </ol>
        </nav>
        <div className="row mt">
        <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/country">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Country</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/state">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">State</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/district">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">District</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/subDistrict">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Sub-District</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/townVillage">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Town / Village</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/minerals">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Type Of Mineral</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/entityType">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Type Of Entity</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/designationType">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Type Of Designation</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/vehicalType">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Type Of Vehicle</h4>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 h-100">
            <Link href="/equipmentType">
              <div className="card1 p-3 demo-card2 hover-effect text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title main-text">Type of Equipment</h4>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default database;
