import React from 'react'

const header = () => {
  return (
    <div>
      <div className="header">
  <nav className="navbar py-2">
    <div className="container-fluid">
      {/* header rightbar icon */}
      <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
        <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
          <div className="u-info me-2">
            <p className="mb-0 text-end line-height-sm">
              <span className="font-weight-bold">Jaimin Motivaras</span>
            </p>
            <small>Admin Profile</small>
          </div>
          <a
            className="nav-link dropdown-toggle pulse p-0"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            data-bs-display="static"
          >
            <img
              className="avatar lg rounded-circle img-thumbnail"
              src="http://mines-manager.com/cpanel/images/profile_av.png"
              alt="profile"
            />
          </a>
          <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
            <div className="card border-0 w280">
              <div className="card-body pb-0">
                <div className="d-flex py-1">
                  <img
                    className="avatar rounded-circle"
                    src="http://mines-manager.com/cpanel/images/profile_av.png"
                    alt="profile"
                  />
                  <div className="flex-fill ms-3">
                    <p className="mb-0">
                      <span className="font-weight-bold">Jaimin Motivaras</span>
                    </p>
                    <small className="">superadmin@gmail.com</small>
                  </div>
                </div>
                <div>
                  <hr className="dropdown-divider border-dark" />
                </div>
              </div>
              <div className="list-group m-2 ">
                <a
                  href="http://mines-manager.com/signout"
                  className="list-group-item list-group-item-action border-0 "
                >
                  <i className="icofont-logout fs-6 me-3" />
                  Signout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* menu toggler */}
      <button
        className="navbar-toggler p-0 border-0 menu-toggle order-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainHeader"
      >
        <span className="fa fa-bars" />
      </button>
      {/* main menu Search*/}
      <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
        <div className="input-group flex-nowrap input-group-lg"></div>
      </div>
    </div>
  </nav>
</div>

    </div>
  )
}

export default header
