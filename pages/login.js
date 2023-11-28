import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  return (
    <div>
      <div id="mytask-layout" className="theme-indigo">
  {/* main body area */}
  <div
    className="main p-2 py-3 p-xl-5 "
    style={{
      backgroundImage: 'url("http://mines-manager.com/cpanel/images/aa.webp")',
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center center",
      backgroundSize: "cover"
    }}
  >
    {/* Body: Body */}
    <div className="body d-flex p-0 p-xl-5">
      <div className="container-xxl">
        <div className="row g-0">
          <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100"></div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
            <div
              className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
              style={{ maxWidth: "32rem" }}
            >
              <div className="card-header">
                <img
                  src="http://mines-manager.com/cpanel/images/logo_white.png"
                  className="float-end"
                  style={{ width: "20%" }}
                  alt=""
                />
                <h2 className="mt-2 ms-2=">Sign in</h2>
                <span className="ms-2= small">
                  Login to access your dashboard.
                </span>
              </div>
              {/* Form */}
              <div className="card-body">
                <form method="POST" action="http://mines-manager.com/login">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="DQJPKAe2PWkRztmlESgafeJqx1h8BncbM81tJaML"
                  />
                  <div className="row g-3 p-3= p-md-4=">
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <div className="col-md-12">
                        <input
                          id="email"
                          type="email"
                          className="form-control form-control-lg "
                          name="email"
                          placeholder="name@example.com"
                          defaultValue=""
                          required=""
                          autoComplete="email"
                          autoFocus=""
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          id="password"
                          name="password"
                          className="form-control= form-control-lg "
                          placeholder="**********"
                          required=""
                          autoComplete="current-password"
                          style={{
                            border: "0px solid #f0f0f0",
                            borderCollapse: "collapse",
                            width: "99.5%",
                            minHeight: "calc(2.4em + 1rem )",
                            borderRadius: 5,
                            padding: "0 10px",
                            fontSize: 16
                          }}
                        />
                        <i
                          className="bi bi-eye-slash icofont-eye-blocked= bi-eye"
                          id="togglePassword"
                          title="Show/Hide Password"
                          style={{
                            marginLeft: "-40px",
                            cursor: "pointer",
                            color: "#333",
                            fontSize: 18
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <input
                        type="submit"
                        className="btn btn-lg btn-block btn-light lift text-uppercase"
                        atl="signin"
                        value="LOGIN"
                      />
                    </div>
                  </div>
                </form>
              </div>
              {/* End Form */}
            </div>
          </div>
        </div>{" "}
        {/* End Row */}
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Login
