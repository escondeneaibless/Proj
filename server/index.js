const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const cors = require('cors'); // добавляем cors




// const mysql = require("mysql2");
// const express = require("express");
// const session = require('express-session');
// const fileUpload = require('express-fileupload');
// const multer = require('multer');
// const formidable = require('formidable');
// const fs = require('fs');
// const cors = require('cors');
// const app = express();
// const path = require('path');
// const bodyParser = require('body-parser');
const mv = require("mv");

// app.use(cors({ origin: '*' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }
// }));
// app.use(fileUpload({
//   createParentPath: true,
// }));
// app.use(fileUpload({ createParentPath: true }));
// app.use(express.json()); app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/static'));
// const urlencodedParser = express.urlencoded({ extended: false });

// const pool = mysql.createPool({
//   connectionLimit: 5,
//   host: "localhost",
//   user: "root",
//   database: "itgid_nodecourse",
//   password: "",
// });

// app.set("view engine", "hbs");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'server/fileForUsers');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // получение списка пользователей
// app.get("/view", function (req, res) {
//   pool.query("SELECT * FROM user", (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       let mas = [];
//       for (var i = 0; i < result.length; i++) {
//         let str = (`${result[i].firstname}  ${result[i].lastname} - - - ${result[i].password}`);
//         mas.push(str);
//       }
//       res.send(mas);

//     }

//   });
// });
// // получение данных и добавление их в БД 
// app.post("/createUser", urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400);
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   const email = req.body.email;
//   const number = req.body.number;
//   const password = req.body.password;
//   pool.query("INSERT INTO user (firstname, lastname, number, email, password) VALUES (?,?,?,?,?)", [firstname, lastname, number, email, password], function (err, data) {
//     if (err) { return console.log(err) };
//     res.send(data)
//     // res.redirect("/");

//   });
// });





//Добавление фото в форме

// app.post('/form_edit', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ msg: 'Не загружен файл' });
//   }
  // file.mv(`${__dirname}/server/fileForUsers/${newFileName}`, (err) => {
  //   const newFileName = req.file.filename;

  //   console.log('file was uploaded');

  //   res.json({
  //     filename: req.file.originalname,
  //     filePath: `/fileForUsers/${newFileName}`,
  //   });
  // });

// });
// app.post('/form_edit', upload.single('file'), (req, res) => {
//   console.log(req.file); // Загруженный файл
//   res.send('File uploaded successfully');
// });


const server = http.createServer((req, res) => {
  if (req.url === "/form_edit" && req.method.toLowerCase() === "post") {
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
                

          console.log("file was uploaded");

          res.json({
            filename: image.originalname,
            filePath: `/fileForUsers/${newFileName}`,
          });
        }
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(files));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  }
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// app.post("/", urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400);
//   const phone = req.body.phone;
//   const mail = req.body.mail;
//   pool.query("INSERT INTO forms (phone, mail) VALUES (?,?)", [phone, mail], function (err, data) {
//     if (err) { return console.log(err) };
//     res.send(data)
//     // res.redirect("/");

//   });
// });

// //Аутентификация
// app.get('/login', (req, res) => {
//   let bod = req.body;
//   let number = bod.number;
//   let password = bod.password;
//   pool.query("SELECT * FROM user", (err, result) => {
//     if (err) {
//       res.send(err)
//     } else {
//       if (number && password) {
//         for (let i = 0; i <= result.length; i++) {
//           if (number === result[i].number && password === result[i].password) {
//             return res.send('OK');
//           }
//         }
//       }
//       else {
//         res.send('Empty line')
//       }
//     }
//   })
// })

// app.listen(5000, function () {
//   console.log("Сервер ожидает подключения...");
// });



