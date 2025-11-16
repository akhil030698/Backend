const UserModel = require('../models/user');
const jwt = require('jsonwebtoken'); 
const bycrypt = require('bcrypt');

const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        console.log('Existing user:', existingUser);
        if (existingUser) {
            return  res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bycrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', success: true });  
    }catch(err){
        res.status(500).json({ message: 'Internal Server Error', success: false });  
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const User = await UserModel.findOne({ email });
        console.log('User', User);
         if (!User) {
            return  res.status(409).json({ message: 'User not exist. Please Signup first' });
        }
        const isMatch = await bycrypt.compare(password, User.password);
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials', success: false });  
        }    
        const jwtToken = jwt.sign({ id: User._id, email: User.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userData = {
            id: User._id,
            name: User.name,
            email: User.email
        };
        res.status(200).json({ message: 'User login successfully', success: true,token:jwtToken, user: userData });  
    }catch(err){
        res.status(500).json({ message: 'Internal Server Error', success: false });  
    }
}

const logout = async (req, res) => {
    try{
        const { email, password, jwtToken } = req.body;
        res.status(200).json({ message: 'User logout successfully', success: true,token:'', user: {} });  
    }catch(err){
        res.status(500).json({ message: 'Internal Server Error', success: false });  
    }
}

module.exports = {
    signup,
    login,
    logout
};