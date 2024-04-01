import pkg from 'pg';

const { Client } = pkg;

class Database {
    constructor(connectionString) {
        this.connectionString = connectionString;
        this.client = new Client({ connectionString });
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }

    async createTables() {
        const createTablesQueries = [
            `
            CREATE TABLE IF NOT EXISTS students (
                studentId VARCHAR(12) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                department VARCHAR(255),
                year INTEGER,
                DOB VARCHAR(20),
                cgpa NUMERIC(3, 2),
                is_active BOOLEAN DEFAULT TRUE
            );            
            `,
            `
            CREATE TABLE IF NOT EXISTS jobs (
                id SERIAL PRIMARY KEY,
                job_title VARCHAR(255) NOT NULL,
                job_description TEXT,
                company_info TEXT,
                salary DECIMAL(10, 2)
            );            
            `,
            `
            CREATE TABLE IF NOT EXISTS trainings (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                description VARCHAR(255),
                duration INTEGER,
                fees INTEGER
            );
                        
            `,

            `
            CREATE TABLE  IF NOT EXISTS Interviews (
                id SERIAL PRIMARY KEY,
                studentName VARCHAR(255),
                companyName VARCHAR(255),
                interviewTitle VARCHAR(255),
                interviewSession TIMESTAMP,
                link VARCHAR(255)
            );
            
                        
            `,
            `
            CREATE TABLE IF NOT EXISTS StudentInformation (
                ID SERIAL PRIMARY KEY,
                FullName VARCHAR(100),
                DateOfBirth DATE,
                ContactEmail VARCHAR(100),
                ContactPhone VARCHAR(15),
                ContactAddress VARCHAR(255),
                BriefBio TEXT,
                GPA DECIMAL(3, 1),
                AwardsHonors VARCHAR(255),
                Scholarships VARCHAR(255),
                ExtracurricularActivities VARCHAR(255),
                TechnicalSkills VARCHAR(255),
                SoftSkills VARCHAR(255),
                LanguageProficiency VARCHAR(255),
                ReactJSCertification BOOLEAN,
                DateOfCompletion DATE,
                IssuingOrganization VARCHAR(100),
                Course1Grade VARCHAR(2),
                Course2Grade VARCHAR(2),
                Course3Grade VARCHAR(2),
                Transcripts BYTEA,
                ResearchProjects TEXT,
                PortfolioLink VARCHAR(255),
                SportsInvolvement VARCHAR(255),
                ClubsOrganizations VARCHAR(255),
                VolunteerWork VARCHAR(255),
                LeadershipRoles VARCHAR(255),
                Internships VARCHAR(255),
                PartTimeJobs VARCHAR(255),
                RelevantWorkExperience TEXT,
                ReferencesInfo TEXT
            );
            
            
            
            
                        
            `,
        ];

        try {
            for (const query of createTablesQueries) {
                await this.client.query(query);
            }
            console.log('Tables created successfully');
        } catch (error) {
            console.error('Error creating tables:', error);
        }
    }

    async disconnect() {
        try {
            await this.client.end();
            console.log('Disconnected from the database');
        } catch (error) {
            console.error('Error disconnecting from the database:', error);
        }
    }
}

export default Database;
