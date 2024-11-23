import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

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