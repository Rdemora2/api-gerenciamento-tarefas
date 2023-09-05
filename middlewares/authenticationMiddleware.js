const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido no corpo da solicitação' });
  }

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};
