const mongoose = require('mongoose');

var Client = mongoose.model('client', {
    fullName: String,
    phone: String,
    email: String,
    userPass: String,
});

module.exports = { Client };