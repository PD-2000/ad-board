const User = require("../models/User.model");
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const {login, password} = req.body;
    if(login && typeof login === 'string' && password && typeof password === 'string') {
      const userWithLogin = await User.findOne({login});
      if(userWithLogin) {
        return res.status(409).send({message: 'User with this login already exists'});
      }
      const user = new User.create({login, password: await bcrypt.hash(password, 10)});
      res.status(201).send({message: 'User created: ' + user.login})
    } else {
			res.status(400).send({message: 'Invalid request'});
		}
  } catch(err) {
    res.status(500).send({message: err.message});
  }
}

exports.login = async (req, res) => {
  try {
    const {login, password} = req.body;
    if(login && typeof login === 'string' && password && typeof password === 'string') {
      if(!user) {
        res.status(400).send({message: 'Incorrect login or password'});
      } else {
        if(bcrypt.compareSync(password, user.password)) {
          res.status(200).send({message: 'Login successful'});
        } else {
          res.status(400).send({message: 'Incorrect login or password'});
        }
      }
    } else {
      res.status(400).send({message: 'Invalid request'});
    }
  } catch {
    res.status(500).send({message: err.message});
  }
}