require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https = require('https');

const app = express();

const requestedLinks =[];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("index.ejs", {shortenLink:"", longLink:""});
});

app.post("/", function(req, res){
  reqUrl  = req.body.longLink;
  url = "https://api.shrtco.de/v2/shorten?url=" + reqUrl;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on('data', function(data){
      const shortLinkData = JSON.parse(data);
      const shortenLink = shortLinkData.result.full_short_link;

      const requestedLink = {
        longUrl: reqUrl,
        shortUrl: shortenLink
      }

      requestedLinks.forEach(function(link){
        if((link.longUrl.localeCompare(requestedLink.longUrl)) === false){
          requestedLinks.push(requestedLink);
        }
      });

      console.log(requestedLinks);

      res.render("index.ejs", {shortenLink: shortenLink , longLink:reqUrl});

    });
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('The server is up and running.');
});
