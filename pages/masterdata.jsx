import React from 'react'
import Link from 'next/link'

const masterdata = () => {
  return (
    <div>
      <div className="container-fluid">
  <div className="row mt">
    <h2 className="mt-3 mb-4 text-center dashboardheader">Master Data</h2>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-5 fs-5">
        <li className="breadcrumb-item">
          <Link href="/mainmenu">
            <i className="fa fa-home" /> / Main Menu
          </Link>
        </li>
      </ol>
    </nav>
    <div className="col-xxl-3 col-xl-3 col-md-6 col-sm-12 col-xs-12">
      <Link href="/database">
        <div className="card1 p-3 demo-card hover-effect">
          <div className="card-body d-flex flex-column justify-content-between ">
            <h4 className="card-title mb-5 main-text">Database</h4>
            <div className="mb-0 d-flex justify-content-between align-items-center subtext ">
              <span className="">Database</span>
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
      </Link>
    </div>
    <div className="col-xxl-3 col-xl-3 col-md-6 col-sm-12 col-xs-12 ">
      <a href="http://mines-manager.com/individualdashboard">
        <div className="card1 p-3  demo-card hover-effect ">
          <div className="card-body d-flex flex-column justify-content-between">
            <h4 className="card-title mb-5  main-text ">Individual</h4>
            <div className="mb-0 d-flex justify-content-between align-items-center subtext ">
              <span className="">Individual</span>
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
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path>
                </svg>
              </i>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div className="col-xxl-3 col-xl-3 col-md-6 col-sm-12 col-xs-12 ">
      <a href="http://mines-manager.com/entitydashboard">
        <div className="card1 p-3 demo-card hover-effect">
          <div className="card-body d-flex flex-column justify-content-between">
            <h4 className="card-title mb-5 main-text">Entity</h4>
            <div className="mb-0 d-flex justify-content-between align-items-center subtext ">
              <span className="">Entity</span>
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
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path>
                </svg>
              </i>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div className="col-xxl-3 col-xl-3 col-md-6 col-sm-12 col-xs-12">
      <a href="http://mines-manager.com/usertypedashboard">
        <div className="card1 p-3 demo-card hover-effect">
          <div className="card-body d-flex flex-column justify-content-between ">
            <h4 className="card-title mb-5 main-text">User Type</h4>
            <div className="mb-0 d-flex justify-content-between align-items-center subtext ">
              <span className="">User type</span>
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
  )
}

export default masterdata
