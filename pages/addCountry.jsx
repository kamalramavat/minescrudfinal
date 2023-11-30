import React, { useState } from 'react';
import Link from 'next/link';
import Modal from 'react-modal';  // Import react-modal


const AddCountry = () => {
  const [formData, setFormData] = useState({
    countryName: '',
    status: false,
  });
  const [alert, setAlert] = useState(null); // State for managing alerts
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = 'http://3.109.155.155:8081';
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
const showAlert = (type, message) => {
    setAlert({ type, message });
    setIsModalOpen(true);
    setTimeout(() => {
      setAlert(null);
      setIsModalOpen(false);
    }, 5000); // Hide the alert after 5 seconds
};
    

try {
  const response = await fetch(`${apiUrl}/country`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Country added successfully:', data);

    // Display success alert
    showAlert('success', `${formData.countryName} has been successfully added.`);

    // Reset form data
    setFormData({ countryName: '', status: false });
  } else {
    const errorData = await response.json(); // Assuming your API returns error details in the response body
    console.log('Error while adding country:', errorData);

    // Display error alert
    showAlert('danger', `Error: ${errorData.message}`);
  }
} catch (error) {
  console.error('Fetch error:', error);

  // Display error alert
  showAlert('danger', 'An error occurred while processing your request.');
}
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is 'status', set boolean value based on the selected option
    const updatedValue = name === 'status' ? value === 'Active' : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };


  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
        <div className="container">
          <div className="card p-0 m-0">
            <div className="card-body">
              <div className="row text-center py-2 no-bg bg-transparent d-flex align-items-center text-underline">
                <h3 className="fw-bold mb-0 dashboardheader">Add Country Details</h3>
              </div>
              <div className="row align-items-center">
                <div className="border-0 mb-2">
                  <div className="card-header py-2 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <nav aria-label="breadcrumb">
                      {/* Breadcrumb code here */}
                    </nav>
                    <Link className="btn btn-primary btn-set-task w-sm-100" href="/country">
                      <i className="icofont-arrow-left fs-6" />
                      Back
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 align-items-center">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <label htmlFor="countryName">
                        Country Name<span className="text-danger">*</span>
                      </label>
                      <input
                        onChange={handleChange}
                        value={formData.countryName}
                        type="text"
                        className="form-control"
                        name="countryName"
                        id="countryName"
                        placeholder="Country Name"
                        maxLength={30}
                        required
                      />
                    </div>

                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <label htmlFor="status">
                        Status<span className="text-danger">*</span>
                      </label>
                      <select
          onChange={handleChange}
          value={formData.status ? 'Active' : 'Inactive'}
          className="form-control"
          name="status"
          id="status"
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
                    </div> */}
                    <div className="justify-content-between d-flex">
                      <button
                        type="submit"
                        className="custome-btn btn btn-primary text-white"
                        style={{ width: 100, fontSize: 14 }}
                      >
                        Save
                        <i className="fa fa-send ms-2" />
                      </button>
                      <button type="button" className="btn btn-danger text-white" onClick={() => setFormData({ countryName: '', status: false })}>
                        Reset
                        <i className="fa fa-refresh ms-2" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
   
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Alert Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000, // Ensure the overlay appears above other elements
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            maxWidth: '20%',
            width: 'auto',
            padding: '0',
            border: 'none',
            borderRadius: '0.5rem',
            boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.75)',
            backgroundColor: 'white',
            color: '#000',
          },
        }}
      >
        {alert && (
          <div className={`modal-content`} style={{ marginBottom: '0' }}>
            <div className="modal-header" style={{ backgroundColor: '#113c62', color: '#fff', padding: '0.5rem' }}>
              <h5 className="modal-title" style={{ margin: 0 }}>{alert.type === 'success' ? 'Success' : 'Error'}</h5>
            </div>
            <div className="modal-body">
              <p>{alert.message}</p>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'flex-end', padding: '0.5rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </Modal>

    


    </div>
  );
};

export default AddCountry;
