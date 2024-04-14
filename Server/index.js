import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import Database from './db.js';

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

const JWT_SECRET = 'mysecretkey';

const tokenStorage = {};

const authenticate = (req, res, next) => {
    if (req.path === '/login') {
        return next();
    }
    console.log('Authenticating request:', req.path);
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Bearer token is required' });
    }
    const token = authHeader.split(' ')[1];
    const userInfo = tokenStorage[token];
    if (!userInfo) {
        return res.status(401).json({ error: 'Invalid token or unauthorized access' });
    }
    req.user = userInfo;
    next();
};

// Routes for coordinators
app.use('/coordinator', authenticate);

app.post('/coordinator/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        const tokenPayload = {
            username: 'admin',
            role: 'coordinator'
        };
        const token = jwt.sign(tokenPayload, JWT_SECRET);
        tokenStorage[token] = { username: 'admin', role: 'coordinator' };
        res.setHeader('Authorization', token);
        return res.status(200).json({ message: 'Login successful', token });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

app.get('/coordinator/jobs', async (req, res) => {
    try {
        const jobs = await database.getAll('jobs');
        res.json(jobs);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/coordinator/jobs', async (req, res) => {
    const { jobTitle, jobDescription, companyInfo, salary } = req.body;
    try {
        await database.insertData('jobs', { jobTitle, jobDescription, companyInfo, salary });
        res.status(201).json({ message: 'Job added successfully' });
    } catch (err) {
        console.error('Error inserting job data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Routes for students
app.use('/student', authenticate);

app.post('/student/login', async (req, res) => {
    const { student_id, dob } = req.body;
    try {
        const student = await database.checkIfInTable('students', { student_id, dob });
        if (student) {
            const tokenPayload = {
                student_id: student.student_id,
                role: 'student'
            };
            const token = jwt.sign(tokenPayload, JWT_SECRET);
            tokenStorage[token] = { student_id, role: 'student' };
            res.setHeader('Authorization', token);
            return res.status(200).json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ error: 'Invalid student_id or dob' });
        }
    } catch (err) {
        console.error('Error during student login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/student/jobs', async (req, res) => {
    try {
        const jobs = await database.getAll('jobs');
        res.json(jobs);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
