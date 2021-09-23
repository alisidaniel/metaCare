import dotenv from 'dotenv';
dotenv.config();

// ENV KEY VARIABLES
const SERVER_PORT: number = parseInt(<string>process.env.SERVER_PORT, 10) || 5000;
const SERVER_HOST_NAME: string = process.env.SERVER_HOST_NAME || 'localhost';
const NODE_ENV: string = process.env.NODE_ENV || 'development';

const SERVER = {
    hostname: SERVER_HOST_NAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER,
    node_env: NODE_ENV
    // others ...
};

export default config;
