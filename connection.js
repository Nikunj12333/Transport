const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Nikunj@123",
    database: "Transport"
})

module.exports = client