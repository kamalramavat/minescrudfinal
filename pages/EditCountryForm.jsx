// EditCountryForm.jsx
import React, { useState } from 'react';

const EditCountryForm = ({ country, onClose, onUpdate }) => {
  const [updatedCountryName, setUpdatedCountryName] = useState(country.countryName);

  const handleUpdate = () => {
    // Perform any validation if needed
    onUpdate(updatedCountryName);
  };

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Country</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <label htmlFor="countryName">Country Name:</label>
            <input
              type="text"
              id="countryName"
              className="form-control"
              value={updatedCountryName}
              onChange={(e) => setUpdatedCountryName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCountryForm;
