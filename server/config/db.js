import 'dotenv/config'
import mysql from 'mysql'

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "akashmysql",
    database: "bookstore"
})

export default db;