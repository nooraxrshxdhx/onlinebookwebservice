const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

// database config
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    ConnectionLimit: 100,
    queueLimit: 0,
};

const app = express();
app.use(express.json());

app.listen(port, () => {
    console.log("Server running on port " + port);
});

// ----------------------
// GET all books
// ----------------------
app.get('/allbooks', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute("SELECT * FROM books");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting books" });
    }
});

// ----------------------
// ADD a book
// ----------------------
app.post('/addbook', async (req, res) => {
    const { title, author } = req.body;

    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            "INSERT INTO books (title, author) VALUES (?, ?)",
            [title, author]
        );
        res.json({ message: "Book added: " + title });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding book" });
    }
});

// ----------------------
// UPDATE a book (using POST)
// ----------------------
app.post('/updatebook', async (req, res) => {
    const { id, title, author } = req.body;

    try {
        let connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            "UPDATE books SET title = ?, author = ? WHERE id = ?",
            [title, author, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No book found with id " + id });
        }

        res.json({ message: "Book updated: " + id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating book" });
    }
});

// ----------------------
// DELETE a book (using POST)
// ----------------------
app.post('/deletebook', async (req, res) => {
    const { id } = req.body;

    try {
        let connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            "DELETE FROM books WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No book found with id " + id });
        }

        res.json({ message: "Book deleted: " + id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting book" });
    }
});