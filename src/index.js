const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const users = require('./users');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'basic_website'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express().use(cors()).use(bodyParser.json()).use(users(connection));

app.listen(port, () =&gt; {
    console.log('Express server listening on port ${port}');
});