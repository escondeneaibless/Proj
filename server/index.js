const mysql = require("mysql2");
const express = require("express");
const formidable = require('formidable');
const bcrypt = require('bcrypt')
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mv = require("mv");
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const port = 5000;
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
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

//Displaying the list of users from the admin
app.get('/client', async (req, res) => {
  const sql1 = "SELECT * FROM Users";
  const sql2 = "SELECT * FROM forms";
  try {
    pool.query(sql1, (err, result) => {
      if (err) { res.send(err) };
      pool.query(sql2, (err, results) => {
        if (err) { res.send(err) };
        res.send([{ "user": result }, { "form": results }]);
      })
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Update role form users
app.post("/client", urlencodedParser, (req, res) => {
  const form = formidable({ multiples: false });
  form.parse(req, (err, forms, form) => {
    if (err) { console.log(err) };
    console.log(forms);
    if (forms[0] === "status") {
      pool.query(forms[3], [forms[2], forms[1]], (err, result) => {
        if (err) { console.log(err) };
        console.log("updated")
      })
    } else {
      pool.query(forms[2], [forms[1]], (err, result) => {
        if (err) { console.log(err) };
        console.log("deleted")
      })
    }
  })
});

// Registration
app.post("/regist", urlencodedParser, function (req, res) {
  const form = formidable({ multiples: false });;
  form.parse(req, (err, forms, form) => {
    if (err) { console.log(err) };
    const hashedPassword = bcrypt.hashSync(forms[2], 7);
    pool.query('INSERT INTO Users (name, phone, password) VALUES (?,?,?)', [forms[0], forms[1], hashedPassword], (err, result) => {
      if (err) { console.log(err) };
      res.send(result);
    });
  })
});

// Authentication
app.post('/login', (req, res) => {
  const form = formidable({ multiples: false });
  form.parse(req, (err, file, files) => {
    pool.query("SELECT * FROM Users", (err, result) => {
      if (err) {
        res.send(err)
      } else {
        if (file) {
          for (let i = 0; i <= result.length; i++) {
            if (file[0] == result[i].phone) {
              const hashPas = bcrypt.compareSync(file[1], result[i].password);
              if (!hashPas) {
                return res.sendStatus(400).json({ message: "Неверный пароль" });
              }
              return res.send(result);
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

//Edit image on form
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
    function generateUniqueFileName(fileExtension) {
      const uniqueFilename = uuidv4();
      return uniqueFilename + fileExtension;
    }
    // Пример использования функции
    const oldFilePath = image.originalFilename;
    const fileExtension = path.extname(oldFilePath);
    const newFileName = generateUniqueFileName(fileExtension);
    const newFilePath = path.join((`${__dirname}/fileForUsers/${newFileName}`), newFileName);
    fs.rename(oldFilePath, newFilePath, (error) => {
      if (error) {
        console.error('Ошибка при переименовании файла:', error);
      } else {
        console.log('Файл успешно переименован.');
      }
    });
    mv(
      image.filepath,
      (`${__dirname}/fileForUsers/${newFileName}`),
      (err) => {
        console.log("file was uploaded");
      }
    );
    console.log(fields.phone.length)
    pool.query("INSERT INTO forms (firstname, lastname, phone, mail, photo) VALUES (?,?,?,?,?)", [fields.firstName, fields.lastName, fields.phone, fields.mail, newFileName], (error, result) => {
      if (error) {
        console.log(error);
      } else {

        console.log('ok');
        res.send(result);
        return;
      }
    });
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



