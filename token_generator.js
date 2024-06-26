const express = require('express');
const fs = require('fs')
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const { GOOGLE_SECRETS } = require('./constants');

const app = express();


// Replace with your own client credentials
const CLIENT_ID = GOOGLE_SECRETS.client_id;
const CLIENT_SECRET = GOOGLE_SECRETS.client_secret;
const REDIRECT_URI = 'http://localhost:8080/oauth'; // Usually http://localhost:3000/oauth2callback

// Create an OAuth2 client to authorize the API call
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);


// Generate an OAuth URL and print it to console
const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
});
console.log('Authorize this app by visiting this URL:', authUrl);

app.get('/oauth', function (req, res) {
    const code = req.query.code
    console.log(code);
    oAuth2Client.getToken(code, function (err, tokens) {
        if (!err) {
            console.log(tokens);
            fs.writeFile('token.json', JSON.stringify(tokens), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to token.json');
            });
            res.send('Authentication successful');
        }
    });
});

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
})

