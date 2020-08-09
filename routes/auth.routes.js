const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');

const authRouter = Router();

// /api/auth/register
authRouter.post(
  '/register',
  [
    check('password', 'Password must have at least 6 characters').isLength({min: 6})
  ],
  async (req, res) => {
  try {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Password must have at least 6 characters'
      })
    }

    const {login, password} = req.body;

    //Проверяем существует ли пользователь
    const candidate = await User.findOne({login});

    if(candidate) {
      return res.status(400).json({message: "User already exist"})
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({login, password: hashedPassword});

    await user.save();

    res.status(201).json({ message: `User ${login} has been created`})

  }
  catch(e){
    res.status(500).json({message: "Something went wrong"})
  }
});

// /api/auth/login
authRouter.post(
  '/login',
  async (req, res) => {
    try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid data'
      })
    }

    const {login, password} = req.body;

    const user = await User.findOne({ login });

    if (!user) {
      return res.status(400).json({ message: 'User has not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password, please try again' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    console.log(user.id);

    res.json({ token, userId: user.id });

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
});

module.exports = authRouter;
