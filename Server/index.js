import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import Database from './db.js';
import scrapeJobs from './Recommend.js';

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key'; // Change this to a random secret key

const dbConnectionString = "postgres://cuwpckyy:CNY7RgFzNLQ0S_9LlHNqn8mVYqCmBE_r@floppy.db.elephantsql.com/cuwpckyy";
const database = new Database(dbConnectionString);

// Connect to the database and create tables
database.connect()
    .then(() => database.createTables())
    .catch(error => console.error('Error connecting to the database:', error));

// Middleware
app.use(cors());
app.use(express.json());

// AES decryption function
function decryptAES(encryptedString, key) {
    const decipher = crypto.createDecipheriv('aes192', key);
    let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Temporary storage for decrypted credentials
let temporaryStorage = {};

// Route for login
app.post('/login', (req, res) => {
    const { encryptedUsername, encryptedPassword } = req.body;

    // Decrypt username and password
    const username = decryptAES(encryptedUsername, SECRET_KEY);
    const password = decryptAES(encryptedPassword, SECRET_KEY);

    // Store the credentials temporarily (for 6 hours)
    temporaryStorage[username] = { password, timestamp: Date.now() };

    // Generate JWT token with expiration after 6 hours
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '6h' });

    res.json({ token });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token)
        return res.status(403).json({ message: 'Token not provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(401).json({ message: 'Failed to authenticate token' });

        req.username = decoded.username;
        next();
    });
}

// Route for protected resource
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You have access to the protected resource!' });
});

// Route to get all students
app.get('/students', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all jobs
app.get('/jobs', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM jobs');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all trainings
app.get('/trainings', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM trainings');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all interviews
app.get('/interviews', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM interviews');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to recommend jobs
app.get('/recommend', async (req, res) => {
    const data = scrapeJobs();
    res.status(200).json({ response: data });
});

app.post('/jobs', async (req, res) => {
    console.log(req.body)
    const { companyInfo, jobDescription, jobTitle, salary } = req.body;
    try {
        await database.client.query('INSERT INTO jobs( job_title, job_description, company_info, salary) VALUES($1, $2, $3, $4)', [companyInfo, jobDescription, jobTitle, salary]);
        res.status(201).json({ message: 'jobadded successfully' });
    } catch (err) {
        console.error('Error inserting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/students', async (req, res) => {
    console.log(req.body)
    const { studentId, name, department, year, dob, cgpa } = req.body;
    try {
        await database.client.query('INSERT INTO students(studentId, name, department, year, dob, cgpa) VALUES($1, $2, $3, $4, $5, $6)', [studentId, name, department, year, dob, cgpa]);
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error('Error inserting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/trainings', async (req, res) => {
    console.log(req.body);
    const { title, description, duration, fees } = req.body;
    try {
        await database.client.query('INSERT INTO trainings(title, description, duration, fees) VALUES($1, $2, $3, $4)', [title, description, duration, fees]);
        res.status(201).json({ message: 'training added successfully' });
    } catch (err) {
        console.error('Error inserting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/Interviews', async (req, res) => {
    console.log(req.body);
    const { studentName, companyName, interviewTitle, interviewSession, link } = req.body;
    try {
        await database.client.query('INSERT INTO Interviews(studentName, companyName, interviewTitle, interviewSession, link) VALUES($1, $2, $3, $4, $5)', [studentName, companyName, interviewTitle, interviewSession, link]);
        res.status(201).json({ message: 'Interviews added successfully' });
    } catch (err) {
        console.error('Error inserting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/students/:Id', async (req, res) => {
    const id = req.params.Id;
    try {
        await database.client.query('DELETE FROM students WHERE studentId = $1', [id]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/jobs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await database.client.query('DELETE FROM jobs WHERE id = $1', [id]);
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/Interviews/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await database.client.query('DELETE FROM Interviews WHERE id = $1', [id]);
        res.json({ message: 'Interviews deleted successfully' });
    } catch (err) {
        console.error('Error deleting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
