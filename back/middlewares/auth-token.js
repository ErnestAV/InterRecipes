const express = require('express')
const jwt = require('jsonwebtoken')
const validToken = express.Router(); 
validToken.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {      
        if (err) {
          return res.json({ 
            status:false,
            message: 'Invalid token' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
        status:false,
        message: 'The token wasnt provided.' 
      });
    }
 });

module.exports = validToken