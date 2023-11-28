import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row mt">
          <h2 className="mt-3 mb-4 text-center dashboardheader">Dashboard</h2>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 ">
            <a href="http://mines-manager.com/combineddispatchmemo/create">
              <div className="card1 p-3  demo-card hover-effect ">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title mb-5  main-text ">
                    Combined Dispatch Memo
                  </h4>
                  <div className="mb-0 d-flex justify-content-between align-items-center subtext ">
                    <span className="">CDM</span>
                    <i className="icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                      </svg>
                    </i>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 ">
            <a href="http://mines-manager.com/combineddispatchreport">
              <div className="card1 p-3  demo-card hover-effect ">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title mb-5  main-text">
                    Combined Dispatch Report
                  </h4>
                  <div className="mb-0 d-flex justify-content-between align-items-center subtext ">
                    <span className="">CDR</span>
                    <i className="icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          fillRule="evenodd"
                          d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM10 17H5v-2h5v2zm0-4H5v-2h5v2zm0-4H5V7h5v2zm4.82 6L12 12.16l1.41-1.41 1.41 1.42L17.99 9l1.42 1.42L14.82 15z"
                        ></path>
                      </svg>
                    </i>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-12 col-xs-12 ">
            <a href="http://mines-manager.com/mainmenu">
              <div className="card1 p-3  demo-card hover-effect ">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4 className="card-title mb-5  main-text">Main Menu</h4>
                  <div className="mb-0 d-flex justify-content-between align-items-center subtext ">
                    <span className="">Main Menu</span>
                    <i className="icon">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                      </svg>
                    </i>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
