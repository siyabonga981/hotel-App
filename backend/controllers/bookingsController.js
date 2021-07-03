const express = require('express');
let router = express.Router();

let { Booking } = require('../models/bookings');

// get all bookings

// router.get('/getBookings', (req, res) => {
//     console.log(req.query);
//     Booking.find((err, docs) => {
//         if (!err) {
//             res.send(docs);
//         } else {
//             console.log(`Error retrieving bookings: ${JSON.stringify(err, undefined, 2)}`);
//         }
//     });
// });

router.get('/getBookings', (req, res) => {
    let query = req.query;
    if(req.query){
        Booking.find(query, (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log(`Error retrieving bookings: ${JSON.stringify(err, undefined, 2)}`);
            }
        })
    }
    else{
        Booking.find((err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log(`Error retrieving bookings: ${JSON.stringify(err, undefined, 2)}`);
            }
        });
    };
});

// save booking

router.post('/addBooking', (req, res) => {
    let booking = new Booking({
        checkInDate: req.body.checkInDate,
        checkoutDate: req.body.checkOutDate,
        checkInTime: req.body.checkInTime,
        checkoutTime: req.body.checkOutTime,
        people: req.body.people,
        room: req.body.room,
        status: req.body.status,
        email: req.body.email
    });
    booking.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log(`Error adding new booking : ${JSON.stringify(err, undefined, 2)}`);
        }
    })
})

module.exports = router;