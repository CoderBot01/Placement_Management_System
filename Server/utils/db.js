import pkg from 'pg';
const { Client } = pkg;

const con = new Client({
    connectionString: "postgres://cuwpckyy:CNY7RgFzNLQ0S_9LlHNqn8mVYqCmBE_r@floppy.db.elephantsql.com/cuwpckyy"
});

// SQL queries to create tables
const createTablesQueries = [
  `
  CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    year_of_joining INTEGER,
    year_of_graduation INTEGER,
    phone_number VARCHAR(20),
    address TEXT,
    resume_url TEXT,
    graduation_year INTEGER,
    gpa NUMERIC(3,2),
    is_active BOOLEAN DEFAULT TRUE

  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Employers (
      employer_id SERIAL PRIMARY KEY,
      company_name VARCHAR(100) NOT NULL,
      industry VARCHAR(100),
      contact_person VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL,
      phone_number VARCHAR(20),
      address TEXT,
      is_active BOOLEAN DEFAULT TRUE
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Jobs (
    job_id SERIAL PRIMARY KEY,
    employer_id INTEGER REFERENCES Employers(employer_id),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    requirements TEXT,
    application_deadline DATE,
    is_active BOOLEAN DEFAULT TRUE
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Applications (
    application_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES Students(student_id),
    job_id INTEGER REFERENCES Jobs(job_id),
    applied_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'Pending'
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Interviews (
    interview_id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES Applications(application_id),
    interview_date TIMESTAMP,
    interview_location VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Scheduled'
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS PlacementActivities (
    activity_id SERIAL PRIMARY KEY,
    activity_name VARCHAR(100) NOT NULL,
    description TEXT,
    activity_date DATE
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS StudentProgress (
    progress_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES Students(student_id),
    activity_id INTEGER REFERENCES PlacementActivities(activity_id),
    progress_status VARCHAR(50)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS Admins (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
  `,
];

async function createTables() {
  try {
    await con.connect();

    // Create tables
    for (const query of createTablesQueries) {
      await con.query(query);
    }

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await con.end();
  }
}

createTables();

export default { createTables };
