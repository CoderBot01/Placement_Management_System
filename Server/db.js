import sqlite3 from 'sqlite3';

class Database {
    constructor(dbFilePath) {
        this.dbFilePath = dbFilePath;
        this.db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error('Error opening database:', err);
            } else {
                console.log('Connected to the database');
            }
        });
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
            'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, student_id TEXT, dob TEXT, name TEXT, email TEXT, phone TEXT, address TEXT, password TEXT)',
            'CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY, job_title TEXT, job_description TEXT, company_info TEXT, salary TEXT)',
            'CREATE TABLE IF NOT EXISTS interviews (id INTEGER PRIMARY KEY AUTOINCREMENT,student_id TEXT, student_name TEXT, interview_title TEXT, company_name TEXT, interview_session TEXT, link TEXT)',
            'CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY, student_id TEXT, progress TEXT)',
            'CREATE TABLE IF NOT EXISTS training (id INTEGER PRIMARY KEY, student_id TEXT, training_title TEXT, description TEXT)',
            ' CREATE TABLE IF NOT EXISTS student_information (id INTEGER PRIMARY KEY,fullName VARCHAR(255) NOT NULL,dateOfBirth DATE, email VARCHAR(255),phone VARCHAR(20),address VARCHAR(255),bio TEXT,gpa DECIMAL(3, 2),awards TEXT,scholarships TEXT,extracurricularActivities TEXT,technicalSkills TEXT,softSkills TEXT, languageProficiency TEXT,certification TEXT,completionDate DATE,issuingOrganization VARCHAR(255), course1 VARCHAR(255),course1Grade VARCHAR(2), course2 VARCHAR(255),course2Grade VARCHAR(2),course3 VARCHAR(255),course3Grade VARCHAR(2),transcripts TEXT,researchProjects TEXT,portfolioProjects TEXT,portfolioLinks TEXT,sportsInvolvement TEXT,clubs TEXT,volunteerWork TEXT, leadershipRoles TEXT,internships TEXT,partTimeJobs TEXT,workExperience TEXT,student_references TEXT)',
            'CREATE TABLE IF NOT EXISTS employer_info(id INTEGER PRIMARY KEY,companyName VARCHAR(255) NOT NULL,companyAddress VARCHAR(255),companyCity VARCHAR(255),companyState VARCHAR(255),companyZip VARCHAR(255),companyPhone VARCHAR(255),companyEmail VARCHAR(255),companyWebsite VARCHAR(255),companyDescription TEXT,companyLogo TEXT,companyBanner TEXT,companyIndustry VARCHAR(255),companySize VARCHAR(255),companyType VARCHAR(255),companyFounded DATE,companySpecialties TEXT,companyBenefits TEXT,companyCulture TEXT,companyValues TEXT,companyMissionStatement TEXT,companyVisionStatement TEXT,companyGoals TEXT,companySocialMediaLinks TEXT,companyReferences TEXT)',


            // Define your table creation queries here
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

    async checkIfInTable(table, columnValues) {
        const conditions = Object.keys(columnValues).map(column => `${column} = ?`).join(' AND ');
        const values = Object.values(columnValues);

        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM ${table} WHERE ${conditions}`, values, (err, row) => {
                if (err) {
                    console.error('Error checking if values exist in table:', err);
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    async insertData(table, data) {
        const columns = Object.keys(data).join(',');
        const placeholders = Object.keys(data).map(() => '?').join(',');
        const values = Object.values(data);

        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values, function (err) {
                if (err) {
                    console.error('Error inserting data:', err);
                    reject(err);
                }
                console.log(`Data inserted successfully with ID: ${this.lastID}`);
                resolve(this.lastID);
            });
        });
    }

    async getAll(table) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${table}`, (err, rows) => {
                if (err) {
                    console.error('Error getting data:', err);
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    async getWhere(table, columnValues) {
        const conditions = Object.keys(columnValues).map(column => `${column} = ?`).join(' AND ');
        const values = Object.values(columnValues);

        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM ${table} WHERE ${conditions}`, values, (err, rows) => {
                if (err) {
                    console.error('Error getting data:', err);
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    async deleteData(table, columnValues) {
        const conditions = Object.keys(columnValues).map(column => `${column} = ?`).join(' AND ');
        const values = Object.values(columnValues);

        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${table} WHERE ${conditions}`, values, function (err) {
                if (err) {
                    console.error('Error deleting data:', err);
                    reject(err);
                }
                console.log(`Data deleted successfully with ID: ${this.changes}`);
                resolve(this.changes);
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
