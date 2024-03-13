import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const Icdesign = () => {
  const [icDesignData, setIcDesignData] = useState([]);
  const [icDesignProjects, setIcDesignProjects] = useState([]);
  const [icDesignClients, setIcDesignClients] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/icdesign')
      .then(response => {
        console.log(response.data);
        setIcDesignData(response.data);
      })
      .catch(error => {
        console.error('Error fetching icDesignClients data:', error);
      });
      
    axios.get('http://localhost:3000/icDesignClients')
      .then(response => {
        console.log(response.data);
        setIcDesignClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching icDesign clients data:', error);
      });

    axios.get('http://localhost:3000/icDesignProjects')
      .then(response => {
        console.log(response.data);
        setIcDesignProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching icDesign Projects data:', error);
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
        <h1  className='heading'>IC Design Service Provider Dashboard</h1>
        <button className="registration-button" onClick={toggleRegisterForm}>Register</button>
      </nav>
      <div className="navbar-container">
        <button className="nav-button" onClick={() => toggleDataVisibility('icDesign')}>IC Design Service Provider</button>
        <button className="nav-button" onClick={() => toggleDataVisibility('icDesignClients')}>IC Design Service Provider Clients</button>
        <button className="nav-button" onClick={() => toggleDataVisibility('icDesignProjects')}>IC Design Service Provider Projects</button>
      </div>

      {showRegisterForm && <RegistrationForm />}
      
      {selectedData === 'icDesign' && (
        <div>
          <h1>IC Design Service Provider Data</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Number of Employees</th>
              </tr>
            </thead>
            <tbody>
              {icDesignData.map(icDesign => (
                <tr key={icDesign.icdesignserviceproviderfirmid}>
                  <td>{icDesign.icdesignserviceproviderfirmid}</td>
                  <td>{icDesign.name}</td>
                  <td>{icDesign.location}</td>
                  <td>{icDesign.noofemployees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedData === 'icDesignProjects' && (
        <div>
          <h1>IC Design Service Provider Projects Data</h1>
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>ProjectName</th>
                <th>Project Details</th>
              </tr>
            </thead>
            <tbody>
              {icDesignProjects.map(icDesignProject => (
                <tr key={icDesignProject.projectid}>
                  <td>{icDesignProject.projectid}</td>
                  <td>{icDesignProject.projectname}</td>
                  <td>{icDesignProject.projectdetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedData === 'icDesignClients' && (
        <div>
          <h1>IC Design Service Provider Clients Data</h1>
          <table>
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Client Details</th>
              </tr>
            </thead>
            <tbody>
              {icDesignClients.map(icDesignClient => (
                <tr key={icDesignClient.clientid}>
                  <td>{icDesignClient.clientid}</td>
                  <td>{icDesignClient.clientname}</td>
                  <td>{icDesignClient.clientdetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    numberOfEmployees: '',
    projectsDelivered: '',
    clients: '',
    detailsOfLeads: '',
    employeesInDepartments: {
      DV: '',
      DFT: '',
      PD: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      location: '',
      numberOfEmployees: '',
      projectsDelivered: '',
      clients: '',
      detailsOfLeads: '',
      employeesInDepartments: {
        DV: '',
        DFT: '',
        PD: ''
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'employeesInDepartments.DV' || name === 'employeesInDepartments.DFT' || name === 'employeesInDepartments.PD') {
      const [department, property] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        employeesInDepartments: {
          ...prevState.employeesInDepartments,
          [department]: value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className='registration-form'>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Company Name" required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input type="number" name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} placeholder="Total number of employees" required />
        <input type="text" name="projectsDelivered" value={formData.projectsDelivered} onChange={handleChange} placeholder="Projects Delivered" required />
        <input type="text" name="clients" value={formData.clients} onChange={handleChange} placeholder="Clients" required />
        <textarea name="detailsOfLeads" value={formData.detailsOfLeads} onChange={handleChange} placeholder="Details of Leads in DV, DFT, PD" required />
        <input type="number" name="employeesInDepartments.DV" value={formData.employeesInDepartments.DV} onChange={handleChange} placeholder="No. of Employees in DV" required />
        <input type="number" name="employeesInDepartments.DFT" value={formData.employeesInDepartments.DFT} onChange={handleChange} placeholder="No. of Employees in DFT" required />
        <input type="number" name="employeesInDepartments.PD" value={formData.employeesInDepartments.PD} onChange={handleChange} placeholder="No. of Employees in PD" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Icdesign;

