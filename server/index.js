const mysql = require("mysql2");
const express = require("express");
const formidable = require('formidable');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mv = require("mv");
// const authRouter = require('./middleware/authRouter');
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
// app.use("/auth", authRouter)
app.use(express.json()); app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));
app.set("view engine", "hbs");
const urlencodedParser = express.urlencoded({ extended: false });
 const pool = mysql.createPool({
   connectionLimit: 5,
   host: "localhost",
   user: "root",
   database: "itgid_nodecourse",
   password: "",
 });
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'server/fileForUsers');
   },
   filename: function (req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname);
   }
 });
 const upload = multer({ storage: storage });

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
   const {name, phone, password} = req.body;
   pool.query("INSERT INTO Users (name, phone, password) VALUES (?,?,?)", [name, phone, password], function (err, data) {
     if (err) { return console.log(err) };
     res.send(data);
    //  res.redirect("/");

   });
 });
 // Registration
 app.post("/regist", urlencodedParser, function (req, res) {
    const form = formidable({multiples: false});
    form.parse(req, (err, forms, form) => {
      if(err){console.log(err)};
        pool.query('INSERT INTO Users (name, phone, password) VALUES (?,?,?)', [forms[0], forms[1], forms[2]], (err, result) => {
        if (err) {console.log(err)};
        res.send(result);
    });
  })
});

//Добавление фото в форме
app.post("/form_edit", (req, res) => {
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => { 
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
        return;
      }
      const { image } = files;
      const newFileName = image.originalFilename;
      mv(
        image.filepath,
        (`${__dirname}/fileForUsers/${newFileName}`),
        (err) => {
          // console.log("file was uploaded");
          res.json({
            filename: image.originalname,
            filePath: `/fileForUsers/${newFileName}`,
          });
        }
      );
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



