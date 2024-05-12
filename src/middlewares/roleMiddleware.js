// middlewares/roleMiddleware.js

const User = require('../models/user');

async function checkAdmin(req, res, next) {
    try {
        console.log(req.userId);
        const user = await User.findOne({ where: { iduser: req.userId } });
        console.log(user);
        if (user.idrole != 1) return res.status(401).json({ error: 'Usted no tiene permisos de administrador' });
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = checkAdmin;