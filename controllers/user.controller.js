const User = require('../models/user.model');
const {setUser} = require('../service/auth');

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name, 
        email, 
        password
    });
    return res.redirect('/')
}

async function handleUserLogin(req, res){
    const {name, email, password} = req.body;
    const user = await User.findOne({email, password}).lean();
    if(!user) return res.render('login', {
        error: "Invalid credentials"
    })
    console.log(user)
    const token = setUser( user);
    res.cookie('uid', token);
    return res.redirect('/')
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}