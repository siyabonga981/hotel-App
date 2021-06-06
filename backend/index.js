const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let { mongoose } = require('./db');
let clientController = require('./controllers/clientController');

let app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})

app.listen(3000, () => { console.log('Server started on port 3000'); });

app.use('/clients', clientController);