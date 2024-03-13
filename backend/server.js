import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Admin-database",
    password: "radhe1122",
    port: 5434
});

db.connect();

app.post('/signup', async (req, res) => { 
  const { email, password, dropdownValue } = req.body;

  try {
    if (!email || !password || !dropdownValue) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
      INSERT INTO signupuser (emailid, password, selected_option)
      VALUES ($1, $2, $3)
    `;
    await db.query(query, [email, password, dropdownValue]); 
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = {
      text: 'SELECT * FROM signupuser WHERE emailid = $1 AND password = $2',
      values: [email, password],
    };

    const result = await db.query(query);
    if (result.rows.length > 0) {
      const selectedOption = result.rows[0].selected_option;
      res.json({ success: true, selected_option: selectedOption });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false, message: 'An error occurred while signing in' });
  }
});

  app.get('/customer', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM customer');
      res.json(result.rows); 
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/customerClients', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM customer_clients');
      res.json(result.rows); 
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/customerProjects', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM customer_projects');
      res.json(result.rows); 
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
    app.get('/icDesign', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM icdesignserviceproviderfirm');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
    app.get('/icDesignClients', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM icdesignserviceproviderfirm_clients');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
    app.get('/icDesignProjects', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM icdesignserviceproviderfirm_projects');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
  
    app.get('/domainleader', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM domainleader');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
    app.get('/domainleaderClients', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM domainleaders_clients');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
    app.get('/domainleaderProjects', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM domainleaders_projects');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
  
    app.get('/engineer', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM engineer');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
    app.get('/engineerProjects', async (req, res) => {
      try {
        const result = await db.query('SELECT * FROM engineer_projects');
        res.json(result.rows); 
      } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  
    app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


  

