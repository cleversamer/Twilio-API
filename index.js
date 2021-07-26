const config = require('config');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const ssid = config.get('ssid');
const token = config.get('token');
const twilioPhone = config.get('phoneNumber');
const client = require('twilio')(ssid, token);

app.post('/sms', (req, res) => {
    client.messages
        .create({
            body: req.body.text,
            from: twilioPhone,
            to: req.body.number
        });

    res.send(`SMS message was sent to ${req.body.number} successfully!`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Express application is listening to port ${port}...`));