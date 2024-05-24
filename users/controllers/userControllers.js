const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Change this to true in production
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        }).json({
            message: `Welcome back ${user.username}`,
            user,
            token,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'User already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getAllUsers = async (req,res) =>{
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find()
          .skip((page - 1) * limit)
          .limit(parseInt(limit));
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports = {
    login,
    createUser,
    getAllUsers,
  };