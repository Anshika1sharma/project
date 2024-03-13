import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const EngineerDashboard = () => {
  const [engineer, setEngineer] = useState([]);
  const [engineerProjects, setEngineerProjects] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/engineer')
      .then(response => {
        console.log(response.data);
        setEngineer(response.data);
      })
      .catch(error => {
        console.error('Error fetching engineer data:', error);
      });
      
    axios.get('http://localhost:3000/engineerProjects')
      .then(response => {
        console.log(response.data);
        setEngineerProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching engineer projects data:', error);
      });
  }, []);

  const toggleDataVisibility = (data) => {
    setSelectedData(selectedData === data ? null : data);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };


  return (
    <div>
      <nav className="navbar">
        <h1 className='heading'>Engineer Dashboard</h1>
        <button className="registration-button" onClick={toggleRegisterForm}>Register</button>
      </nav>
      <div className="navbar-container">
        <button className="nav-button" onClick={() => toggleDataVisibility('engineer')}>Engineer</button>
        <button className="nav-button" onClick={() => toggleDataVisibility('engineerProjects')}>Engineer Projects</button>
      </div>

      {showRegisterForm && <RegistrationForm />}

      {selectedData === 'engineer' && (
        <div>
          <h1>Engineer Data</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Specialization</th>
                <th>Experience in Years</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {engineer.map(engineer => (
                <tr key={engineer.engineerid}>
                  <td>{engineer.engineerid}</td>
                  <td>{engineer.specialization}</td>
                  <td>{engineer.expinyears}</td>
                  <td>{engineer.prefferedlocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedData === 'engineerProjects' && (
        <div>
          <h1>Engineer Projects Data</h1>
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Project Details</th>
              </tr>
            </thead>
            <tbody>
              {engineerProjects.map(engineerProject => (
                <tr key={engineerProject.projectid}>
                  <td>{engineerProject.projectid}</td>
                  <td>{engineerProject.projectname}</td>
                  <td>{engineerProject.projectdetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RegistrationForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    totalExperience: '',
    preferredLocation: '',
    specialization: '',
    pastProjects: '',
    openToWork: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', formData); // Change the URL to your backend endpoint
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
        totalExperience: '',
        preferredLocation: '',
        specialization: '',
        pastProjects: '',
        openToWork: ''
      });
      toggleForm(); // Close the form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className='registration-form'>
      <h2>Registers on Platform</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Engineer Profile" required />
        <input type="number" name="totalExperience" value={formData.totalExperience} onChange={handleChange} placeholder="Total experience in years" required />
        <input type="text" name="preferredLocation" value={formData.preferredLocation} onChange={handleChange} placeholder="Preferred Location" required />
        <select name="specialization" value={formData.specialization} onChange={handleChange} required>
          <option value="">Select Specialization</option>
          <option value="DV">DV</option>
          <option value="DFT">DFT</option>
          <option value="PD">PD</option>
        </select>
        <textarea name="pastProjects" value={formData.pastProjects} onChange={handleChange} placeholder="Past projects" required />
        <select name="openToWork" value={formData.openToWork} onChange={handleChange} required>
          <option value="">Open to work?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default EngineerDashboard;
