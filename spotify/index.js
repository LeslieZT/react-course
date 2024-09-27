const express = require('express')
const querystring = require('querystring');
const axios = require('axios')

var client_id = '2af8c67ffb4e457f95abf5df3ee07f4e';
var redirect_uri = 'http://localhost:8888/callback';
const client_secret = '8071c6a79e8c48d28296877588c92467'


var app = express();

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };



app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  var scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;
    
    if (state === null) {
      res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
    } else {
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
        },
        data: querystring.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirect_uri
        }),
        json: true
      };
  
      try {
        const response = await axios(authOptions);
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        
        res.json({
          access_token: access_token,
          refresh_token: refresh_token
        });
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).send('Authentication failed');
      }
    }
  });



app.listen(8888, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port");
})