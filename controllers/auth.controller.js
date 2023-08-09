const User = require("../models/User.model");
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const {login, password, phoneNumber} = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown file';

    if(login && typeof login === 'string' && password && typeof password === 'string' && req.file
      && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType))
    {
      const userWithLogin = await User.findOne({login});
      if(userWithLogin) {
        fs.unlinkSync(`./public/uploads/${req.file.filename}`);
        return res.status(409).send({message: 'User with this login already exists'});
      }
      const user = new User.create({login, password: await bcrypt.hash(password, 10), phoneNumber, avatar: req.file.filename});
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
          req.session.login = user.login;
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

exports.getUser = async (req, res) => {
  res.send('User logged in');
}

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.send('User logged out');
  } catch(err) {
    res.status(500).send({message: err.message});
  }
}