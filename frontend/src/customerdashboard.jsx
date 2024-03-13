import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [customerProjects, setCustomerProjects] = useState([]);
  const [customerClients, setCustomerClients] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/customer')
      .then(response => {
        console.log(response.data);
        setCustomerData(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
      
    axios.get('http://localhost:3000/domainleaderClients')
      .then(response => {
        console.log(response.data);
        setCustomerClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching Customer clients data:', error);
      });

    axios.get('http://localhost:3000/customerProjects')
      .then(response => {
        console.log(response.data);
        setCustomerProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching Customer Projects data:', error);
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
        <h1 className='heading'>Customer Dashboard</h1>
        <button className="registration-button" onClick={toggleRegisterForm}>Register</button>
      </nav>
      
      <div className="navbar-container">
        <button className="nav-button" onClick={() => toggleDataVisibility('customer')}>Customer</button>
        <button className="nav-button" onClick={() => toggleDataVisibility('customerClients')}>Customer Clients</button>
        <button className="nav-button" onClick={() => toggleDataVisibility('customerProjects')}>Customer Projects</button>
      </div>

      {showRegisterForm && <RegistrationForm />}
      
      {selectedData === 'customer' && (
        <div>
          <h1>Customer Data</h1>
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
              {customerData.map(customer => (
                <tr key={customer.customerid}>
                  <td>{customer.customerid}</td>
                  <td>{customer.name}</td>
                  <td>{customer.location}</td>
                  <td>{customer.noofemployees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedData === 'customerClients' && (
        <div>
          <h1>Customer Clients Data</h1>
          <table>
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Client Details</th>
              </tr>
            </thead>
            <tbody>
              {customerClients.map(customerClient => (
                <tr key={customerClient.clientid}>
                  <td>{customerClient.clientid}</td>
                  <td>{customerClient.clientname}</td>
                  <td>{customerClient.clientdetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedData === 'customerProjects' && (
        <div>
          <h1>Customer Projects Data</h1>
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Project Details</th>
              </tr>
            </thead>
            <tbody>
              {customerProjects.map(project => (
                <tr key={project.projectid}>
                  <td>{project.projectid}</td>
                  <td>{project.projectname}</td>
                  <td>{project.projectdetails}</td>
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
    existingClients: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      location: '',
      numberOfEmployees: '',
      projectsDelivered: '',
      existingClients: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='registration-form'>
    <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Company Name" required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <input type="number" name="numberOfEmployees" value={formData.numberOfEmployees} onChange={handleChange} placeholder="Total number of employees" required />
        <input type="text" name="projectsDelivered" value={formData.projectsDelivered} onChange={handleChange} placeholder="Projects Delivered" required />
        <input type="text" name="existingClients" value={formData.existingClients} onChange={handleChange} placeholder="Existing Clients" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerDashboard;
