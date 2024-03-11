import express from 'express';
import cors from 'cors'; // Import cors middleware
import Database from './db.js';

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

app.get('/', async (req, res) => {
    res.status(200).json({ response: 'Welcome' });
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

app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await database.client.query('DELETE FROM students WHERE studentId = $1', [id]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
