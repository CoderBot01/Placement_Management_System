import sqlite3 from 'sqlite3';

class Database {
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;
        this.db = new sqlite3.Database(dbFilePath);
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                console.log('Connected to the database');
                resolve();
            });
        });
    }

    async createTables() {
        const createTablesQueries = [
            `CREATE TABLE IF NOT EXISTS students (
                student_id VARCHAR(12) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                department VARCHAR(255),
                year INTEGER,
                dob VARCHAR(20),
                cgpa NUMERIC(3, 2),
                is_active BOOLEAN DEFAULT TRUE
            )`,
            `CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY,
                job_title VARCHAR(255) NOT NULL,
                job_description TEXT,
                company_info TEXT,
                salary DECIMAL(10, 2)
            )`,
            `CREATE TABLE IF NOT EXISTS trainings (
                id INTEGER PRIMARY KEY,
                title VARCHAR(255),
                description VARCHAR(255),
                duration INTEGER,
                fees INTEGER
            )`,
            `CREATE TABLE IF NOT EXISTS interviews (
                id INTEGER PRIMARY KEY,
                student_name VARCHAR(255),
                company_name VARCHAR(255),
                interview_title VARCHAR(255),
                interview_session TIMESTAMP,
                link VARCHAR(255)
            )`,
            `CREATE TABLE IF NOT EXISTS student_information (
                id INTEGER PRIMARY KEY,
                full_name VARCHAR(100),
                date_of_birth DATE,
                contact_email VARCHAR(100),
                contact_phone VARCHAR(15),
                contact_address VARCHAR(255),
                brief_bio TEXT,
                gpa DECIMAL(3, 1),
                awards_honors VARCHAR(255),
                scholarships VARCHAR(255),
                extracurricular_activities VARCHAR(255),
                technical_skills VARCHAR(255),
                soft_skills VARCHAR(255),
                language_proficiency VARCHAR(255),
                reactjs_certification BOOLEAN,
                date_of_completion DATE,
                issuing_organization VARCHAR(100),
                course1_grade VARCHAR(2),
                course2_grade VARCHAR(2),
                course3_grade VARCHAR(2),
                transcripts BLOB,
                research_projects TEXT,
                portfolio_link VARCHAR(255),
                sports_involvement VARCHAR(255),
                clubs_organizations VARCHAR(255),
                volunteer_work VARCHAR(255),
                leadership_roles VARCHAR(255),
                internships VARCHAR(255),
                part_time_jobs VARCHAR(255),
                relevant_work_experience TEXT,
                references_info TEXT
            )`
        ];

        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                createTablesQueries.forEach(query => {
                    this.db.run(query, (err) => {
                        if (err) {
                            console.error('Error creating tables:', err);
                            reject(err);
                        }
                    });
                });
                console.log('Tables created successfully');
                resolve();
            });
        });
    }

    async disconnect() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    console.error('Error disconnecting from the database:', err);
                    reject(err);
                }
                console.log('Disconnected from the database');
                resolve();
            });
        });
    }
}

export default Database;
