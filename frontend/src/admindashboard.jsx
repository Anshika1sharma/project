import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const AdminDashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [icDesignData, setIcDesignData] = useState([]);
  const [domainLeaderData, setDomainLeaderData] = useState([]);
  const [engineerData, setEngineerData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [approvalDropdownVisible, setApprovalDropdownVisible] = useState(false);
  const [profilesDropdownVisible, setProfilesDropdownVisible] = useState(false);
  const [registrationDropdownVisible, setRegistrationDropdownVisible] = useState(false);
  const [customerDropdownVisible, setCustomerDropdownVisible] = useState(false);
  const [icDropdownVisible, setICDropdownVisible] = useState(false);
  const [domainDropdownVisible, setDomainDropdownVisible] = useState(false);
  const [engineerDropdownVisible, setEngineerDropdownVisible] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
  useEffect(() => {
    axios.get('http://localhost:3000/customer')
      .then(response => {
        console.log(response.data);
        setCustomerData(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/icDesign')
      .then(response => {
        console.log(response.data);
        setIcDesignData(response.data);
      })
      .catch(error => {
        console.error('Error fetching IC design data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/domainLeader')
      .then(response => {
        console.log(response.data);
        setDomainLeaderData(response.data);
      })
      .catch(error => {
        console.error('Error fetching domain leader data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/engineer')
      .then(response => {
        console.log(response.data);
        setEngineerData(response.data);
      })
      .catch(error => {
        console.error('Error fetching engineer data:', error);
      });
  }, []);

  const toggleDataVisibility = (data) => {
    setSelectedData(selectedData === data ? null : data);
  };

  const toggleRegistrationForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className='heading'>Admin Dashboard</h1>
        <button className="registration-button" onClick={toggleRegistrationForm}>Register</button>
      </nav>
      <div className="navbar-container">
        <button className="nav-button" onClick={() => setApprovalDropdownVisible(!approvalDropdownVisible)}>Approval</button>
        {approvalDropdownVisible && (
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => setCustomerDropdownVisible(!customerDropdownVisible)}>Customer</button>
            {customerDropdownVisible && (
              <div className="dropdown">
                <button className="drop">Approved</button>
                <button className="drop">Rejected</button>
                <button className="drop">In Progress</button>
              </div>
            )}
            <button className="dropdown-button" onClick={() => setICDropdownVisible(!icDropdownVisible)}>IC Design Service Provider Firm</button>
            {icDropdownVisible && (
              <div className="dropdown">
                <button className="drop">Approved</button>
                <button className="drop">Rejected</button>
                <button className="drop">In Progress</button>
              </div>
            )}
            <button className="dropdown-button" onClick={() => setDomainDropdownVisible(!domainDropdownVisible)}>Domain Leaders</button>
            {domainDropdownVisible && (
              <div className="dropdown">
                <button className="drop">Approved</button>
                <button className="drop">Rejected</button>
                <button className="drop">In Progress</button>
              </div>
            )}
            <button className="dropdown-button" onClick={() => setEngineerDropdownVisible(!engineerDropdownVisible)}>Engineers</button>
            {engineerDropdownVisible && (
              <div className="dropdown">
                <button className="drop">Approved</button>
                <button className="drop">Rejected</button>
                <button className="drop">In Progress</button>
              </div>
            )}
          </div>
        )}
        <button className="nav-button" onClick={() => setProfilesDropdownVisible(!profilesDropdownVisible)}>Profiles</button>
        {profilesDropdownVisible && (
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => toggleDataVisibility('customer')}>Customer</button>
            <button className="dropdown-button" onClick={() => toggleDataVisibility('icDesign')}>IC Design Service Provider Firm</button>
            <button className="dropdown-button" onClick={() => toggleDataVisibility('domainLeader')}>Domain Leaders</button>
            <button className="dropdown-button" onClick={() => toggleDataVisibility('engineer')}>Engineers</button>
          </div>
        )}
        <button className="nav-button" onClick={() => setRegistrationDropdownVisible(!registrationDropdownVisible)}>Registration</button>
        {registrationDropdownVisible && (
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => toggleDataVisibility('customer')}>Customer</button>
            <button className="dropdown-button" onClick={() => toggleDataVisibility('icDesign')}>IC Design Service Provider Firm</button>
            <button className="dropdown-button" onClick={() => toggleDataVisibility('domainLeader')}>Domain Leaders</button>
            <button className="dropdown-button" onClick={() => toggleDataVisibility('engineer')}>Engineers</button>
          </div>
        )}
      </div>

      {showRegistrationForm && <RegistrationForm />}

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

      {selectedData === 'domainLeader' && (
        <div>
          <h1>Domain Leader Data</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Head</th>
                <th>Experience in Years</th>
              </tr>
            </thead>
            <tbody>
              {domainLeaderData.map(domainLeader => (
                <tr key={domainLeader.domainleaderid}>
                  <td>{domainLeader.domainleaderid}</td>
                  <td>{domainLeader.headin}</td>
                  <td>{domainLeader.expinyears}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedData === 'engineer' && (
        <div>
          <h1>Engineers Data</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Specialization</th>
                <th>Experience in years</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {engineerData.map(engineer => (
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
    <div className="registration-form">
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

export default AdminDashboard;

