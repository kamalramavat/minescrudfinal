import React, { useState } from 'react';
import Link from 'next/link';
import { Modal, Button } from 'react-bootstrap';

const AddCountry = () => {
  const [formData, setFormData] = useState({
    countryName: '',
  });
  const [validationError, setValidationError] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const apiUrl = 'http://15.207.20.189:8081';
  const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMDQ3NzE2MywiZXhwIjozODQ3OTYwODEwfQ.r0m_f1jui6oyZprcBvTaBgR3Bt8mupeK_bQG5_UAsOAF6kcH1mJ9_YcrFJN__eol9qDi4WUbqvklG7M6KxtX6g';

  const isValidCountryName = (countryName) => /^[a-zA-Z ]{3,}$/.test(countryName);

  const handleCountryNameChange = (inputValue) => {
    if (isValidCountryName(inputValue) || inputValue === '') {
      setFormData({ ...formData, countryName: inputValue });
      setValidationError('');
    } else {
      setValidationError('Please enter alphabets only.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'countryName') {
      handleCountryNameChange(value);
    }
  };


  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        showAlert(`${formData.countryName} has been successfully added.`);
        setFormData({ countryName: '' });
      } else {
        const errorData = await response.json();
        console.log('Error while adding country:', errorData);
        showAlert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      showAlert('An error occurred while processing your request.');
    }
  };


  return (
    <div>
      <div className="body d-flex py-lg-3 py-md-2">
        <div className="container">
          <div className="card p-6 m-0">
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
                      <i className="bi bi-backspace-fill me-2"></i> Back
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body pt-2">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 align-items-center">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <p><label htmlFor="countryName" className="form-label">
                        Country Name<span className="text-danger">*</span>
                      </label></p>
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

                      {isAlertVisible && (
                        <Modal show={isAlertVisible} onHide={() => setIsAlertVisible(false)} centered backdrop="static" keyboard={false}>
                          <Modal.Header style={{ backgroundColor: '#113c62', color: 'white', paddingBottom: '0' }}>
                            <Modal.Title>Alert</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {alertMessage}
                          </Modal.Body>
                          <Modal.Footer style={{ paddingTop: '0' }}>
                            <Button variant="primary" onClick={() => setIsAlertVisible(false)} style={{ backgroundColor: '#113c62', color: 'white' }}>
                              OK
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      )}

                    </div>
                    <div className="justify-content-between d-flex">
                      <button
                        type="submit"
                        className="custome-btn btn btn-primary text-white"
                        style={{ width: 100, fontSize: 14 }}
                      >
                        Save
                        <i className="fa fa-send ms-2" />
                      </button>
                      <button type="button" className="btn btn-danger text-white" onClick={() => setFormData({ countryName: '', status: true })}>
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
    </div>
  );
};

export default AddCountry;
