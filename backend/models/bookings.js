const mongoose = require("mongoose");

let Booking = mongoose.model("booking", {
    checkInDate: String,
    checkoutDate: String,
    checkInTime: String,
    checkoutTime: String,
    people: Number,
    room: Object,
    status: String,
    email: String,
});

module.exports = { Booking };