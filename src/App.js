// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    residentialAddress: {
      street1: "",
      street2: "",
    },
    permanentAddress: {
      street1: "",
      street2: "",
    },
    fileDetails: {
      fileName: "",
      fileType: "",
      uploadDocument: null,
    },
    sameAsResidential: false, // New state for the checkbox
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleResidentialAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      residentialAddress: {
        ...prevFormData.residentialAddress,
        [name]: value,
      },
    }));
  };

  const handlePermanentAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      permanentAddress: {
        ...prevFormData.permanentAddress,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fileDetails: {
        ...prevFormData.fileDetails,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleFileUpload = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      fileDetails: {
        ...prevFormData.fileDetails,
        uploadDocument: e.target.files[0],
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      sameAsResidential: checked,
      // If checked, copy the residential address to the permanent address
      permanentAddress: checked
        ? {
            street1: prevFormData.residentialAddress.street1,
            street2: prevFormData.residentialAddress.street2,
          }
        : {
            street1: "",
            street2: "",
          },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //the below condition will check if the person is 18 years old or not
    const minAge = 18;
    const today = new Date();
    const dob = new Date(formData.dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();
    if (age < minAge) {
      alert(`You must be at least ${minAge} years old to register.`);
      return;
    }
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("email", formData.email);
    data.append(
      "residentialAddress[street1]",
      formData.residentialAddress.street1
    );
    data.append(
      "residentialAddress[street2]",
      formData.residentialAddress.street2
    );
    data.append("permanentAddress[street1]", formData.permanentAddress.street1);
    data.append("permanentAddress[street2]", formData.permanentAddress.street2);
    data.append("fileName", formData.fileDetails.fileName);
    data.append("fileType", formData.fileDetails.fileType);
    data.append("uploadDocument", formData.fileDetails.uploadDocument);

    try {
      await axios.post("http://localhost:5000/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="App">
      <h1>Xicom Registration Form</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="firstname">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="lastname">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="dateofbirth">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Residential Address</h3>
        <div className="street1">
          <label>Street 1:</label>
          <input
            type="text"
            name="street1"
            value={formData.residentialAddress.street1}
            onChange={handleResidentialAddressChange}
            required
          />
        </div>
        <div className="street2">
          <label>Street 2:</label>
          <input
            type="text"
            name="street2"
            value={formData.residentialAddress.street2}
            onChange={handleResidentialAddressChange}
            required
          />
        </div>
          <h3>Permanent Address</h3>
        <div >
          <input className="checkbox"
            type="checkbox"
            name="sameAsResidential"
            checked={formData.sameAsResidential}
            onChange={handleCheckboxChange}
            />
            <label className="checkbox2">Same as Residential</label>
        </div>
        {/* Conditional rendering of Permanent Address */}
        {!formData.sameAsResidential && (
          <div className="street3">
            <label>Street 1:</label>
            <input
              type="text"
              name="street1"
              value={formData.permanentAddress.street1}
              onChange={handlePermanentAddressChange}
            />
          </div>
        )}
        {!formData.sameAsResidential && (
          <div className="street4">
            <label>Street 2:</label>
            <input
              type="text"
              name="street2"
              value={formData.permanentAddress.street2}
              onChange={handlePermanentAddressChange}
            />
          </div>
        )}
        <div>
          <h2>Upload Documents</h2>
          <div className="filename">
            <label>File Name:</label>
            <input
              type="text"
              name="fileName"
              value={formData.fileDetails.fileName}
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="type">
            <label>Type of File:</label>
            <select
              name="fileType"
              value={formData.fileDetails.fileType}
              onChange={handleFileChange}
              required
            >
              <option value="">Select</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div className="upload">
            <label>Upload Documents:</label>
            {/* Update the file input to accept multiple files */}
            <input
              type="file"
              name="uploadDocuments"
              onChange={handleFileUpload}
              multiple//this will help to upload multiple files
              required
            />
          </div>
        </div>
        <div>
          <div className="filename">
            <label>File Name:</label>
            <input
              type="text"
              name="fileName"
              value={formData.fileDetails.fileName}
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="type">
            <label>Type of File:</label>
            <select
              name="fileType"
              value={formData.fileDetails.fileType}
              onChange={handleFileChange}
              required
            >
              <option value="">Select</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div className="upload">
            <label>Upload Documents:</label>
            {/* Update the file input to accept multiple files */}
            <input
              type="file"
              name="uploadDocuments"
              onChange={handleFileUpload}
              multiple//this will help to upload multiple files
              required
            />
          </div>
        </div>
        <button className="submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
