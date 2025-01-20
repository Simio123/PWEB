import Database from "better-sqlite3";


const db = new Database("movies.db", { verbose: console.log });


db.exec(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    imdbID TEXT UNIQUE NOT NULL
  );
`);

export default db;
