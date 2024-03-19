import express from 'express';
import cors from 'cors'; // Import cors middleware
import Database from './db.js';
import scrapeJobs from "./Recommend.js";

const app = express();
const port = 3000;


const dbConnectionString = "postgres://cuwpckyy:CNY7RgFzNLQ0S_9LlHNqn8mVYqCmBE_r@floppy.db.elephantsql.com/cuwpckyy";
const database = new Database(dbConnectionString);

// Connect to the database and create tables
database.connect()
    .then(() => database.createTables())
    .catch(error => console.error('Error connecting to the database:', error));

app.use(cors()); // Add cors middleware

app.use(express.json());

app.get('/students', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/jobs', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM jobs');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/trainings', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM trainings');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/Interviews', async (req, res) => {
    try {
        const result = await database.client.query('SELECT * FROM Interviews');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/', async (req, res) => {
    res.status(200).json({ response: 'Welcome' });
});


app.get('/Recommend', async (req, res) => {
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
    const { studentId, name, department, year, cgpa } = req.body;
    try {
        await database.client.query('INSERT INTO students(studentId, name, department, year, cgpa) VALUES($1, $2, $3, $4, $5)', [studentId, name, department, year, cgpa]);
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
