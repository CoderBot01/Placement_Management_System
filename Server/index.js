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

    const { job_title, job_description, company_info, salary } = req.body;
    if (!job_title || !job_description || !company_info || !salary) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await database.insertData('jobs', { job_title, job_description, company_info, salary });
        res.status(201).json({ message: 'Job added successfully' });
    } catch (err) {
        console.error('Error inserting job data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/coordinator/jobs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await database.deleteData('jobs', {id });
        res.json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting job data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/coordinator/student', async (req, res) => {
    const { student_id, name, year, department, cgpa, dob } = req.body;
    if (!student_id || !name || !year || !department || !cgpa || !dob) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await database.insertData('students', { student_id, name, year, department, cgpa, dob });
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error('Error inserting student data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/coordinator/student', async (req, res) => {
    try {
        const data = await database.getAll('students');
        res.json(data);        
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/coordinator/student/:student_id', async (req, res) => {
    const { student_id } = req.params;
    try {
        await database.deleteData('students', { student_id });
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting student data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/coordinator/trainings', async (req, res) => {
    try {
        const data = await database.getAll('trainings');
        res.json(data);        
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/coordinator/trainings', async (req, res) => {
    const { title, description, duration, fees } = req.body;
    if (!title || !description || !duration || !fees) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await database.insertData('trainings', { title, description, duration, fees });
        res.status(201).json({ message: 'Training added successfully' });
    } catch (err) {
        console.error('Error inserting training data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.delete('/coordinator/trainings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await database.deleteData('trainings', { id });
        res.json({ message: 'Training deleted successfully' });
    } catch (err) {
        console.error('Error deleting training data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.get('/coordinator/interviews', async (req, res) => {
    try {
        const data = await database.getAll('interviews');
        res.json(data);        
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.post('/coordinator/interviews', async (req, res) => {
    const { student_id, student_name, company_name, interview_title, interview_session, link } = req.body;
    if (!student_id || !student_name || !company_name || !interview_title || !interview_session || !link) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await database.insertData('interviews', { student_id, student_name, company_name, interview_title, interview_session, link });
        res.status(201).json({ message: 'Interview added successfully' });
    } catch (err) {
        console.error('Error inserting interview data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.delete('/coordinator/interviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await database.deleteData('interviews', { id });
        res.json({ message: 'Interview deleted successfully' });
    } catch (err) {
        console.error('Error deleting interview data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.get('/coordinator/employers', async (req, res) => {
    try {
        const data = await database.getAll('employers');
        res.json(data);        
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.post('/coordinator/employers', async (req, res) => {
    const { employer,companyName,address, about, hrName, contactDetails } = req.body;
    if (!employer || !companyName || !address || !about || !hrName || !contactDetails) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await database.insertData('employers', { employer, companyName, address, about, hrName, contactDetails});
        res.status(201).json({ message: 'Employer added successfully' });
    } catch (err) {
        console.error('Error inserting employer data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.delete('/coordinator/employers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await database.deleteData('employers', { id });
        res.json({ message: 'Employer deleted successfully' });
    } catch (err) {
        console.error('Error deleting employer data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);







// Routes for students
app.use('/student', authenticate);

app.post('/student/login', async (req, res) => {
    const { student_id, dob } = req.body;
    if (!student_id || !dob) {
        return res.status(400).json({ error: 'All fields are required' });
    }
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



app.get('/', (req, res) => {
    res.send('Welcome to the Placement Coordinator API');
});

app.get('/jobs', async (req, res) => {
    const { skill, location } = req.query;
    const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${skill}&location=${location}`;
    
    try {
      const response = await axios.get(url);
      res.json(response.data);
    }catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
    }
  );


app.get('/student/StudentInformation/:student_id', async (req, res) => {
    const { student_id } = req.params;
    try {
        const data = await database.getWhere('students', { student_id });
        res.json(data);        
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/student/trainings', async (req, res) => {
    try {
        const data = await database.getAll('trainings');
        res.json(data);        
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.post('/student/trainings/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id } = req.user;
    try {
        await database.insertData('student_trainings', { student_id, training_id: id });
        res.status(201).json({ message: 'Training applied successfully' });
    } catch (err) {
        console.error('Error applying for training', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/student/interviews', async (req, res) => {
    try {
        const data = await database.getAll('interviews');
        res.json(data);        
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.post('/student/interviews/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id } = req.user;
    try {
        await database.insertData('student_interviews', { student_id, interview_id: id });
        res.status(201).json({ message: 'Interview applied successfully' });
    } catch (err) {
        console.error('Error applying for interview', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.get('/student/studentinformation/:student_id', async (req, res) => {
    const { student_id } = req.params;
    try {
        const data = await database.getWhere('students', { student_id });
        res.json(data);
    } catch (err) {
        console.error('Error getting data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

app.post('/student/studentinformation/:student_id', async (req, res) => {
   
    const { id, student_id, dob, name, email, year, department, phone, address, password, bio, cgpa, awards, scholarships, extracurricularActivities, technicalSkills, softSkills, languageProficiency, certification, completionDate, issuingOrganization, course1, course1Grade, course2, course2Grade, course3, course3Grade, transcripts, researchProjects, portfolioProjects, portfolioLinks, sportsInvolvement, clubs, volunteerWork, leadershipRoles, internships, partTimeJobs, workExperience, student_references } = req.body;
    console.log('Updating student information:',student_id);
    // if (!ID || !fullName || !dateOfBirth || !email || !phone || !address || !bio || !gpa || !awards || !scholarships || !extracurricularActivities || !technicalSkills || !softSkills || !languageProficiency || !certification || !completionDate || !issuingOrganization || !course1 || !course1Grade || !course2 || !course2Grade || !course3 || !course3Grade || !transcripts || !researchProjects || !portfolioProjects || !portfolioLinks || !sportsInvolvement || !clubs || !volunteerWork || !leadershipRoles || !internships || !partTimeJobs || !workExperience || !references) {
    //     return res.status(400).json({ error: 'All fields are required' });
    // }
    try {
        await database.updateData('students', { student_id }, { dob, name, email, year, department, phone, address, password, bio, cgpa, awards, scholarships, extracurricularActivities, technicalSkills, softSkills, languageProficiency, certification, completionDate, issuingOrganization, course1, course1Grade, course2, course2Grade, course3, course3Grade, transcripts, researchProjects, portfolioProjects, portfolioLinks, sportsInvolvement, clubs, volunteerWork, leadershipRoles, internships, partTimeJobs, workExperience, student_references });
        res.json({ message: 'Student information updated successfully' });
    } catch (err) {
        console.error('Error updating student information', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
