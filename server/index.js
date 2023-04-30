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
const port = 5000;
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

// app.get('/client', async (req, res) => {
//   try {
//     pool.query("SELECT * FROM Users", (err, result) => {
//       if (err) {res.send(err)};
//       res.json(result)
//     })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Ошибка сервера' });
//   }
// });

app.get('/client', async (req, res) => {
  const sql1 = "SELECT * FROM Users";
  const sql2 = "SELECT * FROM forms";
  try {
    pool.query(sql1, (err, result,) => {
      if (err) {res.send(err)};
      // res.json(result)
      pool.query(sql2, (err, results)=> {
        if (err) {res.send(err)};
        // res.json(results)
        res.send([{ "user":result}, {"form":JSON.stringify(results)}]);
      })     
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

app.post("/client", urlencodedParser, (req, res) => {
  const form = formidable({multiples: false});
  form.parse(req, (err, forms, form) => {
    if(err){console.log(err)};
      pool.query('UPDATE Users SET role=? WHERE id=?', [forms[1] ,forms[0]], (err, result) => {
      if(err){console.log(err)}else{
        console.log('Role updated');
      return res.send(result);
      };      
  });
})
});

 // получение данных и добавление их в БД 
 app.post("/createUser", urlencodedParser, function (req, res) {
   if (!req.body) return res.sendStatus(400);
   const {name, phone, password} = req.body;
   pool.query("INSERT INTO Users (name, phone, password) VALUES (?,?,?)", [name, phone, password], function (err, data) {
     if (err) { return console.log(err) };
     res.send(data);
   });
 });

 // Registration
 app.post("/regist", urlencodedParser, function (req, res) {
    const form = formidable({multiples: false});
    const role = "USER";
    form.parse(req, (err, forms, form) => {
      if(err){console.log(err)};
        pool.query('INSERT INTO Users (name, phone, password, role) VALUES (?,?,?,?)', [forms[0], forms[1], forms[2], role], (err, result) => {
        if (err) {console.log(err)};
        res.send(result);
    });
  })
});

//Аунтификация
app.post('/login', (req, res) => {
  const form = formidable({ multiples: false });
  form.parse(req, (err, file, files) => {
    pool.query("SELECT * FROM Users", (err, result) => {
        if (err) {
          res.send(err)
        } else {
          if (file) {
            for (let i = 0; i <= result.length; i++) {
              if (file[0] == result[i].phone && file[1] === result[i].password) {
                res.sendStatus(200);               
                return console.log(`Ok`);     
              }            
            }
            
          }
          else {
            res.json('Empty line');
            return console.log(file);
            
          }
        }
      })
  });
})

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

app.get('/client', (req, res) => {
  pool.query("SELECT * FROM Users", (err, date) => {
    if (err) {
      console.log(err)
    } else { 
      let mas = [];
      for (var i = 0; i < date.length; i++) {    
        let str = (`${date[i].name} - - - ${date[i].phone} - - - ${date[i].password} - - - ${date[i].role}`);
        mas.push(str);
      }
      console.log(mas);
      return res.json(mas);
       
    }
  });
});

app.listen(port, function () {
  console.log(`Сервер ожидает подключения на порту ${port}`);
});



