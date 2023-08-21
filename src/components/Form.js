import React, { useState } from "react";
import "./Form.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    id: "",
    address: "",
    designation: "",
    joiningDate: "",
    gender: "",
    experiences: [],
  });

  const genderOptions = ["Male", "Female", "Other"];

  //it will update formdata state when any input fields are changed
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //it will add an  empty work exp object by 
//spreading the previous state and adding new object to array
  const handleAddexperiences = () => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: [
        ...prevData.experiences,
        { companyName: "", designation: "", timePeriod: "" },
      ],
    }));
  };


  //using this to delete the entry of particular index
  const handleDeleteexperiences = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      experiences: prevData.experiences.filter((_, i) => i !== index),
    }));
  };


  //It creates a copy of the experiences array, updates the specified field of the specified entry, and then sets the modified array back to the state.
  const handleEditexperiences = (index, field, value) => {
    setFormData((prevData) => {
      const updatedexperiences = [...prevData.experiences];
      updatedexperiences[index][field] = value;
      return { ...prevData, experiences: updatedexperiences };
    });
  };


  //it is used to send the data to the backend by using a particular route
  const handleSubmit = async (e) => {
    console.log(formData);
    try {
      const response = await fetch("http://localhost:5000/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Handle response as needed
      console.log("Response:", response);

      alert("Employee Registration successful!");
    } catch (error) {
      alert("Employee Registration failed. fill all the details carefully",);
    }
  };


  return (
    <div   className="App">
      <h1>Employee Registration Form</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="name">
          <label>Employee name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="number">
          <label>Employee mobile no:</label>
          <input
            type="mobile"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="email">
          <label>Employee email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="id">
          <label>Employee Id:</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="name">
          <label>Employee address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="designation">
          <label>Employee designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="joiningDate">
          <label>Employee Joining Date:</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="gender">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            required
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {genderOptions.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="experience">
          <h2>Work Experience</h2>
          <table>
            <tbody>
              {formData.experiences.map((workExp, index) => (
                <tr key={index}>
                  <td>
                    <input
                      className="companyname"
                      type="text"
                      value={workExp.companyName}
                      onChange={(e) =>
                        handleEditexperiences(
                          index,
                          "companyName",
                          e.target.value
                        )
                      }
                      placeholder="Company Name"
                    />
                  </td>
                  <td>
                    <input
                      className="degination2"
                      type="text"
                      value={workExp.designation}
                      onChange={(e) =>
                        handleEditexperiences(
                          index,
                          "designation",
                          e.target.value
                        )
                      }
                      placeholder="Designation"
                    />
                  </td>
                  <td>
                    <input
                      className="timeperiod"
                      type="text"
                      value={workExp.timePeriod}
                      onChange={(e) =>
                        handleEditexperiences(
                          index,
                          "timePeriod",
                          e.target.value
                        )
                      }
                      placeholder="Time Period"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteexperiences(index)}
                      className="delbutton"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <button onClick={handleAddexperiences} className="addexp">
        Add Work Experience
      </button>
      <button onClick={handleSubmit} className="submit">
        Submit
      </button>
    </div>
  );
}

export default App;
