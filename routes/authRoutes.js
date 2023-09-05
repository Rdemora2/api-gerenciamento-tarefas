const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/User');

// Rota de cadastro
router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('name').notEmpty(),
  ],
  async (req, res) => {
    // Validação de entrada usando express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Verifica se o usuário já existe no banco de dados
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ error: 'Email já registrado' });
      }

      // Se o usuário não existir, cria um novo usuário no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha

      const newUser = await User.create({ name, email, password: hashedPassword });

      // Gera um token JWT para o novo usuário
      const token = jwt.sign({ id: newUser.id }, authConfig.secret, {
        expiresIn: '1d', // Tempo de validade do token (no caso, 1 dia)
      });

      return res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }
);

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário com o email fornecido existe no banco de dados
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados usando bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Se as senhas coincidirem, gera um token JWT para o usuário
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: '1d', // Tempo de validade do token (no caso, 1 dia)
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;
