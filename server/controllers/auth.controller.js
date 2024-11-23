import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    try {

        await newUser.save()
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {

        next(error);
        
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
    
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch) {
            return next(errorHandler(401, 'Invalid credentials'));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry time
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};