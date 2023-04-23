const mysql = require("mysql2");
const express = require("express");
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const app = express();
const path = require('path');
// const mv = require("mv");
const fileUpload= require("express-fileupload");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(cors());
app.use(fileUpload({
  createParentPath: true,
}))
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

const urlencodedParser = express.urlencoded({ extended: false });

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "itgid_nodecourse",   
  password: "",
});

app.set("view engine", "hbs");

// получение списка пользователей
app.get("/view", function (req, res) {
  pool.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      let mas = [];
      for (var i = 0; i < result.length; i++) {
        let str = (`${result[i].firstname}  ${result[i].lastname} - - - ${result[i].password}`);
        mas.push(str);
      } 
      res.send(mas);

    }

  });  
});
// получение данных и добавление их в БД 
app.post("/createUser", urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const number = req.body.number;
  const password = req.body.password;
  pool.query("INSERT INTO user (firstname, lastname, number, email, password) VALUES (?,?,?,?,?)", [firstname, lastname, number, email, password], function (err, data) {
    if (err) { return console.log(err) };
    res.send(data)
    // res.redirect("/");

  });
});





//Добавление фото в форме
app.post('/form_edit',urlencodedParser, (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: 'Не загружен файл' });
  }
  // const file = req.files.file;
  let file = req.files['file[]'];
  file.mv(`${__dirname}/project/src/fileForUsers/${newFileName}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    console.log('file was uploaded');

    res.json({
      filename: file.name,
      filePath: `/fileForUsers/${newFileName}`,
    });
  });

});






app.post("/", urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const phone = req.body.phone;
  const mail = req.body.mail;
  pool.query("INSERT INTO forms (phone, mail) VALUES (?,?)", [phone, mail], function (err, data) {
    if (err) { return console.log(err) };
    res.send(data)
    // res.redirect("/");

  });
});

//Аутентификация
app.get('/login', (req, res) => {
  let bod = req.body;
  let number = bod.number;
  let password = bod.password;
  pool.query("SELECT * FROM user", (err, result) => {
    if (err) {
      res.send(err)
    } else {
      if (number && password) {
        for (let i = 0; i <= result.length; i++) {
          if (number === result[i].number && password === result[i].password) {
            return res.send('OK');       
          }
        } 
      }
      else {
        res.send('Empty line')
      }
    }
  })
})

app.listen(5000, function () {
  console.log("Сервер ожидает подключения...");
});

 