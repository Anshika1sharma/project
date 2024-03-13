import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';

const DomainLeaderDashboard = () => {
  const [domainLeaderData, setDomainLeaderData] = useState([]);
  const [domainLeaderProjects, setDomainLeaderProjects] = useState([]);
  const [domainLeaderClients, setDomainLeaderClients] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/domainleader')
      .then(response => {
        console.log(response.data);
        setDomainLeaderData(response.data);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
      });
      
    axios.get('http://localhost:3000/domainleaderClients')
      .then(response => {
        console.log(response.data);
        setDomainLeaderClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching Customer clients data:', error);
      });

    axios.get('http://localhost:3000/domainleaderProjects')
      .then(response => {
        console.log(response.data);
        setDomainLeaderProjects(response.data);
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
        <h1 className='heading'>Domain Leader Dashboard</h1>
        <button className="registration-button" onClick={toggleRegisterForm}>Register</button>
      </nav>
      <div className="navbar-container">
        <button className="nav-button" onClick={() => toggleDataVisibility('domainleader')}> Leader</button>
        <button className="nav-button" onClick={() => toggleDataVisibility('domainleaderClients')}>Domain Leader Clients</button>
        <button className="nav-button" onClick={() => toggleDataVisibility('domainleaderProjects')}>Domain Leader Projects</button>
      </div>

      {showRegisterForm && <RegistrationForm />}

      {selectedData === 'domainleader' && (
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

      {selectedData === 'domainleaderClients' && (
        <div>
          <h1>Domain Leader Clients Data</h1>
          <table>
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Client Name</th>
                <th>Client details</th>
              </tr>
            </thead>
            <tbody>
              {domainLeaderClients.map(domainLeaderClient => (
                <tr key={domainLeaderClient.clientid}>
                  <td>{domainLeaderClient.clientid}</td>
                  <td>{domainLeaderClient.clientname}</td>
                  <td>{domainLeaderClient.clientdetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedData === 'domainleaderProjects' && (
        <div>
          <h1>Domain Leader Projects Data</h1>
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Project Details</th>
              </tr>
            </thead>
            <tbody>
              {domainLeaderProjects.map(domainLeaderProject => (
                <tr key={domainLeaderProject.projectid}>
                  <td>{domainLeaderProject.projectid}</td>
                  <td>{domainLeaderProject.projectname}</td>
                  <td>{domainLeaderProject.projectdetails}</td>
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
    totalExperience: '',
    tapeoutsHandled: '',
    pastProjectsDetails: '',
    clientsServed: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      totalExperience: '',
      tapeoutsHandled: '',
      pastProjectsDetails: '',
      clientsServed: ''
    });
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
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Domain Leader Profile" required />
        <input type="number" name="totalExperience" value={formData.totalExperience} onChange={handleChange} placeholder="Total experience in years" required />
        <input type="number" name="tapeoutsHandled" value={formData.tapeoutsHandled} onChange={handleChange} placeholder="Number of tapeouts handled" required />
        <textarea name="pastProjectsDetails" value={formData.pastProjectsDetails} onChange={handleChange} placeholder="Details of past projects" required />
        <textarea name="clientsServed" value={formData.clientsServed} onChange={handleChange} placeholder="Clients Served in the past" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DomainLeaderDashboard;
