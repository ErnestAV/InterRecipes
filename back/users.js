const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");
const jwt = require('jsonwebtoken')
const router = express.Router();
const app = express();
//Esquema del usuario

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  nationality: String,
});

//Record del usuario

userSchema.pre('save', async function(next) {
    // Hash si fue modificado o nuevo
  if (!this.isModified('password'))
    return next();

  try {
    const hash = await argon2.hash(this.password);
    // hash sobre escritura
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Metodo para comparar la contraseña
userSchema.methods.comparePassword = async function(password) {
  try {
    const validMatch = await argon2.verify(this.password, password);
    return validMatch;
  } catch (error) {
    return false;
  }
};

// User a JSON
userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

// Crear usuario usando el esquema
const User = mongoose.model('User', userSchema);

/* Middleware */

// chequear por usuarios loggeados
const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // pedir al usuario loggeado
    req.user = user;
  } catch (error) {
    // error si usuario no existe
    return res.status(403).send({
      message: "not logged in"
    });
  }

  // ir al siguiente middleware
  next();
};

/* API Endpoints */

// crear usuario
router.post('/', async (req, res) => {
  // Informacion requerida:
    // primer nombre, apellido, user, password
  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password)
    return res.status(400).send({
      message: "first name, last name, username and password are required"
    });

  try {

    //  Chequear si usario ya existe
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (existingUser)
      return res.status(403).send({
        message: "username already exists"
      });

    // crear nuevo usuario y subirlo a la base de datos
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    // informacion de la sesion del usuario
    req.session.userID = user._id;
    const payload = {
      check:  true,
      user:user
    };
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: 1440
    });
    // hacer saber que el usuario fue creado
    return res.status(200).send({
      message:"User created",
      status:true,
      user: user,
      token: token
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// loggear a un usuario
router.post('/login', async (req, res) => {
  // Requerir usuario y contraseña
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);

  try {
    //  Ver el record del usuario
    const user = await User.findOne({
      username: req.body.username
    });
    // Error si el usuario es malo
    if (!user)
      return res.status(403).send({
        status:false,
        message: "username or password is wrong"
      });

    // Error si el password es malo
    if (!await user.comparePassword(req.body.password))
      return res.status(403).send({
        status:false,
        message: "username or password is wrong"
      });
    
    const payload = {
      check:  true,
      user:user
    };
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: 1440
    });
    // Informacion de la sesión del usuario
    //req.session.userID = user._id;

    return res.status(200).send({
      status:true,
      user: user,
      token : token
    });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Agarrar al usuario loggeado
router.get('/', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Sali de la sesión
router.delete("/", validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


module.exports = {
  routes: router,
  model: User,
  valid: validUser
};
