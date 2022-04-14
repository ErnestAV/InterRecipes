const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// poner el express
const app = express();
app.use(cors())
// parser al middleware al url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//app.use(express.static(path.join(__dirname, 'front')));

// conectar a la base de datos
mongoose.connect('mongodb+srv://interrecipes:RecetasLocas.503@cluster0.bcsew.mongodb.net/interrecipes?retryWrites=true&w=majority', { //cambiar el path
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// importar modulo de usuarios y el camino a la API
const users = require("./users.js");
app.use("/api/users", users.routes);

// importar las recetas
const recipes = require("./recipes.js");
app.use("/api/recipes", recipes.routes);

// import the comments module
const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.get('/welcome', (req, res)=> {
  res.send('welcome to recipes api')
})
app.listen(process.env.PORT || 5000, () => console.log('Server listening on port 3001!'));
