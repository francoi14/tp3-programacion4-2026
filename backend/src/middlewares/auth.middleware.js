const passport = require('passport');

const autenticar = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ mensaje: 'error interno al validar autenticacion' });
        }
        if (!user) {
            return res.status(401).json({ mensaje: 'acceso no autorizado, token invalido o expirado' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = { autenticar };