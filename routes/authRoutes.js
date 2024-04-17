const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/User');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('name').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Email já registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ id: newUser.id }, authConfig.secret, {
        expiresIn: '1d',
      });

      return res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: '1d',
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

router.get('/validate-token', authenticationMiddleware, (req, res) => {
  res.status(200).json({ message: 'Token válido' });
});

module.exports = router;
