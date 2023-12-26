const User = require('../models/Users');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ status: 400, message: error.details[0].message });

  //Существует ли такой email в базе
  const emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send('Email already exists');

  //Хеширование пароля
  const salt = bcrypt.genSaltSync(10);
  let hashPassword = await bcrypt.hash(req.body.password, salt);

  await User.create({
    username: req.body.login,
    email: req.body.email,
    password: hashPassword
  }).then(reqq => {
    res.send({ message: 'Registered successfully', res: reqq })
  })
    .catch(err => {
      res.sendStatus(400).send({ message: err })
    })
}


exports.userLogin = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ status: 400, message: error.details[0].message });

  //Существует ли такой email в базе
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('email is wrong');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  //Создать токен
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({ user, token });
}

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  if (!users) return res.sendStatus(400).send({ message: 'Users not found' });
  res.send(users);
}

exports.userAuth = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: verified._id });
    if (!user) return res.status(401).send('User not found');
    res.header('auth-token', token).send(user);
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};