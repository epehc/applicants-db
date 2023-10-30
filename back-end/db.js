/**
 * Database Connection Module
 *
 * This module establishes a connection to the PostgreSQL database using the `pg` library.
 * It exports a pool object that can be used to interact with the database.
 *
 * @module databaseConnection
 *
 * @requires pg
 *
 */

const Pool = require("pg").Pool;

/**
 * Configuration object for the PostgreSQL connection pool.
 *
 * @typedef {Object} PoolConfig
 * @property {string} user - The PostgreSQL user.
 * @property {string} password - The password for the PostgreSQL user.
 * @property {string} host - The host of the PostgreSQL server.
 * @property {number} port - The port of the PostgreSQL server.
 * @property {string} database - The name of the database to connect to.
 */

/**
 * The connection pool object.
 *
 * @type {Pool}
 * @const
 * @namespace pool
 */
const pool = new Pool({
    user: "postgres",
    password: "Cardona8399!",
    host: "localhost",
    port: 5432,
    database: "applicants-db"
});

module.exports = pool;
