
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

module.exports = {

    getToken: function(user) {
        const expiresIn = 3 * 24 * 60 * 60 // expires in 3 days
        // create a token
        const token = jwt.sign({
            username: user.username,
            id: user.id,
            email: user.email
        }, config.superSecret, {
            expiresIn: expiresIn
        });
        return token;
    },

    isInt: function(value) {
        return !isNaN(value) 
                && (parseInt(Number(value)) == value) 
                && (!isNaN(parseInt(value, 10)));
    }

};