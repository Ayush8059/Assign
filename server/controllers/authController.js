const users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await users.findOne({ email });
        if (existing) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token, user: { id: user._id, name: user.name } , msg: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, user: { id: user._id, name: user.name ,email:user.email} });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};



exports.getUserByEmail = async (req, res) => {
  try {
    const user = await users.findOne({ email: req.params.email }).select('name email');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
