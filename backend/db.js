const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hotel:jvPh60sb@mycluster.pilxa.mongodb.net/HotelApp?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (!err) console.log("Database connection successful");
    else
        console.log(
            `Error connecting to database : ${JSON.stringify(err, undefined, 2)}`
        );
});

module.exports = mongoose;