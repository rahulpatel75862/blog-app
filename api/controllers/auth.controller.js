import User from "../models/user.model.js";

export const signup = async(req, res) => {
    const { userName, email, password } = req.body;

    if(!userName || !email || !password || userName === '' || email === '' || password === ''){
        return res.status(400).json({ message: 'All Fields are required' });
    }

    const newUser = new User({
        userName,
        email,
        password
    })

    try{
        await newUser.save();
    res.json('Signup successfull');
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}