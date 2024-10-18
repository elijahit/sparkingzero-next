const sqlite3 = require("sqlite3").verbose();
const {open} = require("sqlite");


  // open the database
  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  })
  export default db;

