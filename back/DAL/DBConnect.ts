// This script is how we connect to the postgresSQL DB
import { Client } from 'pg';

require("dotenv/config");

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
})

async function connect() {
    try {
        await client.connect();
        console.log('Connected to PostgresSQL');
    } catch (error){
        console.error('Error connecting to postgres:', error);
    }
}
connect();

export function getClient(): Client{
    return client;
}