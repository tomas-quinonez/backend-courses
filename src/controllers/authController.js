// controllers/authController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
    try {
        const { username, password, name, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.build({ username, password: hashedPassword, name, email, idrole: 2 });
        console.log(user.toJSON());
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrió un fallo en el registro' });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'La autenticación falló' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'La autenticación falló' });
        }

        const token = jwt.sign({ userId: user.iduser }, 'your-secret-key', {
            expiresIn: '1h',
        });

        return res
            .cookie("access_token", token, {
                httpOnly: true,
                //secure: process.env.NODE_ENV !== "development",
                secure: false,
                maxAge: 4000000
            })
            .status(200)
            .json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// User logout
exports.logout = async (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Sesión cerrada exitosamente" });
};