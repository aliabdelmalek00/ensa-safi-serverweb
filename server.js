const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


// Create MySQL database connection
const connection = mysql.createConnection({
  host: '194.233.160.248',
  user: 'ali',
  password: 'ali00fF50.',
  database: 'ENSA',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Get all students
app.get('/etudiants', (req, res) => {
  const query = 'SELECT * FROM Etudaints';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

// Get a student by ID
app.get(`/etudiants/:id`, (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM Etudaints WHERE id = ? `;

  // Execute the query
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Student not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new student
app.post('/etudiants', (req, res) => {
  const { name, email, address, filier, dept } = req.body;
  const query = 'INSERT INTO Etudaints (name, email, address, filier, dept) VALUES (?, ?, ?, ?, ?)';

  // Execute the query
  connection.query(query, [name, email, address, filier, dept], (err, result) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const newStudentId = result.insertId;
    res.status(201).json({ id: newStudentId, name, email, address, filier, dept });
  });
});

// Update a student
app.put('/etudiants/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, address, filier, dept } = req.body;
  const query = 'UPDATE Etudaints SET name = ?, email = ?, address = ?, filier = ?, dept = ? WHERE id = ?';

  // Execute the query
  connection.query(query, [name, email, address, filier, dept, id], (err, result) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Student not found');
    } else {
      res.status(200).json({ id, name, email, address, filier, dept });
    }
  });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});