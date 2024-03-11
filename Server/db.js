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
                studentId SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                department VARCHAR(255),
                year INTEGER,
                cgpa NUMERIC(3, 2),
                is_active BOOLEAN DEFAULT TRUE
            );
            
      
            
            `,
            // Define other table creation queries here
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
