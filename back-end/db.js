const Pool = require("pg").Pool;

const pool= new Pool({
    user: "postgres",
    password: "Cardona8399!",
    host: "localhost",
    port: 5432,
    database: "applicants-db"
})

module.exports = pool;

