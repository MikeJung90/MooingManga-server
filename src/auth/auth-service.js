const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');

const AuthService = {
  parseBasicToken(token){
    return Buffer.from(token, 'base64').toString().split(':');
  },

  findByUsername(knex, user_name){
    return knex('mooingmanga_users').where({user_name}).first('*');
  },

  comparePasswords(loginPassword, savedPassword){
    return bcrypt.compare(loginPassword, savedPassword);
  },

  createJwt(subject, payload) {
    return jwt.sign(payload, JWT_SECRET, {
      subject,
      expiresIn: JWT_EXPIRY,
      algorithm: 'HS256',
    });
  },

  verifyJwt(token) {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
  }
};

module.exports = AuthService;