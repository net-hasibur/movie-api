
const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

// Connect to MySQL database---------------------
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hasibur@ds",
    database: "movie_info"
});

// check database connection---------------------
db.connect(function(err) {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("Database connected");
    }
});


app.get("/", function(req, res) {
    res.send("Movie API ");
});

// Movie API ---------------------

app.get("/movies", function(req, res) {
    db.query("SELECT * FROM Movie", function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// Director API ---------------------
app.get("/directors", function(req, res) {
    db.query("SELECT * FROM Director", function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


// Actor API ---------------------
app.get("/actors", function(req, res) {
    db.query("SELECT * FROM Actor", function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// Character API ---------------------
app.get("/characters", function(req, res) {
    db.query("SELECT * FROM Movie_Characters", function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


// Add a new movie---------------------
app.post("/movies", function(req, res) {

    const data = req.body;

    const sql = `
        INSERT INTO Movie
        (Movie_ID, Movie_Name, Genre, Year, IMDb_Rating, Director_ID)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.Movie_ID,
        data.Movie_Name,
        data.Genre,
        data.Year,
        data.IMDb_Rating,
        data.Director_ID
    ];

    db.query(sql, values, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send("Movie added successfully");
        }
    });
});

app.listen(3000, function() {
    console.log("Server started at http://localhost:3000");
});