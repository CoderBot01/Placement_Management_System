// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import Database from './db.js';
import scrapeJobs from './Recommend.js';

const app = express();
const PORT = process.env.PORT || 3000;

const dbFilePath = 'database.db';
const database = new Database(dbFilePath);

// Connect to the database and create tables
database.connect()
    .then(() => database.createTables())
    .catch(error => console.error('Error connecting to the database:', error));

// Middleware
app.use(cors());
app.use(express.json());

// Set a default secret key for JWT signing
const JWT_SECRET = 'your_secret_key_here'; // Replace with your actual secret key

// Token storage
const tokenStorage = {};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

// Route for student login
app.post('/student/login', async (req, res) => {
    const { student_id, dob } = req.body;
    try {
        const result = await database.client.get('SELECT * FROM students WHERE student_id = ? AND dob = ?', [student_id, dob]);
        if (result) {
            // Generate token
            const tokenPayload = {
                student_id: result.student_id,
                role: 'student'
            };
            const token = jwt.sign(tokenPayload, JWT_SECRET);
            // Store token with student_id
            tokenStorage[token] = { student_id, role: 'student' };
            // Set token in response header
            res.setHeader('Authorization', token);
            // Send response
            return res.status(200).json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ error: 'Invalid student_id or dob' });
        }
    } catch (err) {
        console.error('Error during student login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for coordinator login
app.post('/coordinator/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        // Generate token
        const tokenPayload = {
            username: 'admin',
            role: 'coordinator'
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET);
        // Store token with username
        tokenStorage[token] = { username: 'admin', role: 'coordinator' };
        // Set token in response header
        res.setHeader('Authorization', token);
        // Send response
        return res.status(200).json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

// Routes for coordinators
app.use('/coordinator', verifyToken, (req, res, next) => {
    if (req.user.role !== 'coordinator') {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    next();
});

// Routes for students
app.use('/student', verifyToken, (req, res, next) => {
    if (req.user.role !== 'student') {
        return res.status(403).json({ error: 'Unauthorized access' });
    }
    next();
});

// Coordinator routes
app.get('/coordinator/students', async (req, res) => {
    try {
        const result = await database.client.all('SELECT * FROM students');
        res.json(result);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/coordinator/students', async (req, res) => {
    const { student_id, name, department, year, dob, cgpa } = req.body;
    try {
        await database.client.run('INSERT INTO students(student_id, name, department, year, dob, cgpa) VALUES(?, ?, ?, ?, ?, ?)', [student_id, name, department, year, dob, cgpa]);
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error('Error inserting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/coordinator/students/:student_id', async (req, res) => {
    const { student_id } = req.params;
    try {
        await database.client.run('DELETE FROM students WHERE student_id = ?', [student_id]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting student', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add more coordinator routes as needed

// Student routes
app.get('/student/jobs', async (req, res) => {
    try {
        const result = await database.client.all('SELECT * FROM jobs');
        res.json(result);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/student/recommend', async (req, res) => {
    const data = scrapeJobs();
    res.status(200).json({ response: data });
});

// Add more student routes as needed

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
