const express = require('express');
const usersRouter = express.Router();
const bodyParser = express.json();
const UsersService = require('./users-service.js');

usersRouter
  .route('/')
  .post(bodyParser, async (req, res, next) => {
  
    const {user_name, first_name, last_name, email, password} = req.body;
    const newUser = {user_name, first_name, last_name, email, password};

    for (const [key, value] of Object.entries(newUser)) {
      if (!value) {
        return res.status(400).json({error: `Missing ${key} in request body`});
      }
    }

    if(user_name) newUser.user_name = user_name;

    try {
      const result = await UsersService.validateFields(req.app.get('db'), newUser);
      if (result.error) {
        return res.status(400).json(result);
      }
  
      newUser.password = await UsersService.hashPassword(newUser.password);
          
      const filteredUser = UsersService.sanitize(newUser);
      const savedUser = await UsersService.insert(req.app.get('db'), filteredUser);
      delete savedUser.password;

      res
        .status(201)
        .location(`/api/users/${savedUser.id}`)
        .json(savedUser);
    } catch(err) {
      next(err);
    }
  });


module.exports = usersRouter;