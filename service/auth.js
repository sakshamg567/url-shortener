const jwt = require('jsonwebtoken');
const secret = "abcd";

function setUser(user) {
    if(!user) return null; 
    return jwt.sign(user, secret)
}

function getUser(token) {
    if(!token) return null;
    try{
        return jwt.verify(token,secret)
    } catch(e) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}