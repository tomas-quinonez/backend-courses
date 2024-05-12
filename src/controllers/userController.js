// controllers/userController.js

const User = require('../models/user');
const Role = require('../models/role');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['iduser', 'username', 'name', 'email', 'created_at'],
            include: [{
                model: Role,
                attributes: ['idrole', 'name']
            }]
        });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};