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
            this.db.run(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`, values, function(err) {
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
            this.db.run(`DELETE FROM ${table} WHERE ${conditions}`, values, function(err) {
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
