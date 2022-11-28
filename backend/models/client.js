const mongoose = require('mongoose');

var Client = mongoose.model('users', {
    fullName: String,
    phone: String,
    email: String,
    userPass: String,
});

module.exports = { Client };