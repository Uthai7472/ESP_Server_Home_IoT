const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const app = express();

let ledCommand = "OFF";
let ledStatus = "";

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(bodyParser.json());

// ---------------CONTROL ON/OFF LED------------------------------------
app.post('/api/led-on-off', (req, res) => {
    const {command} = req.body;

    ledCommand = command;
    console.log(ledCommand);

    // Respond with success message
    res.json({ message: `LED command updated to ${ledCommand}` });
});

app.get('/api/led-on-off', (req, res) => {
    console.log(`Get request command: ${ledCommand}`);

    res.json({ ledCommand });
});

// ---------------MONITOR ON/OFF LED------------------------------------
app.post('/api/led-status', (req, res) => {
    const {status} = req.body;

    ledStatus = status;
    res.status(200).json({ message: `LED status is : ${ledStatus}` });
});

app.get('/api/led-status', (req, res) => {
    console.log(`Get LED status: ${ledStatus}`);

    res.json({ ledStatus });
});

app.listen(port, () => {
    console.log(`Server in running on port: ${port}`);
});