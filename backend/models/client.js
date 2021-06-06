const mongoose = require('mongoose');

var Client = mongoose.model('client', {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    userPass: String,
    gender: String
        // bookings: { type: Array }

});

module.exports = { Client };