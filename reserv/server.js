const mysql = require('mysql');
const express = require("express");
const app = express();


let query = "SELECT * FROM user";

const conn = mysql.createConnection({
    host: 'localhost',
    user: "root",
    database: "itgid_nodecourse",
    password: ""
})
app.get("/api", (req, res) => {
    conn.query(query, (err, result) => {
        res.json(result)
    })
    // conn.query(query, (err, result) => {   
    //     res.json(result[0]['firstname']);
    // })
})
app.post("/auth", urlencodedParser, (req, res) => {
    console.log()
    fs.appendFile('testFile.txt', ' This line is beyond the end. \n', (err) => {
        if(err) throw err;
        console.log('Data has been added!');
    });
})
app.listen(5000, () => (console.log(5000)))
conn.connect(err => {
    if (err) {
        return err;
    } else {
        console.log('Started server on port 5000');
    }
})

module.exports = fs;
