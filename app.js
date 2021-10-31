require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https = require('https');

const app = express();

let requestedLinks = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  requestedLinks = [];
  res.render("index.ejs", {
    errMsg: "",
    requestedLinks: []
  });
});

app.post("/", function(req, res) {
  const reqUrl = req.body.longLink;
  const shortReqUrl = reqUrl.slice(0, 31) + "...";

  url = "https://api.shrtco.de/v2/shorten?url=" + reqUrl;
  https.get(url, function(response) {

    console.log(response.statusCode);
    const responseCode = response.statusCode;

    if (responseCode === 201) {

      response.on('data', function(data) {
        const shortLinkData = JSON.parse(data);
        const shortenLink = shortLinkData.result.full_short_link;

        const requestedLink = {
          longUrl: shortReqUrl,
          shortUrl: shortenLink,
          id: ""
        }

        if (requestedLinks.length === 0) {
          requestedLink.id = 0;
          requestedLinks.push(requestedLink);
        } else {
          const rlink = requestedLink.longUrl;
          let count = 0;
          requestedLinks.forEach(function(link) {
            if ((rlink == (link.longUrl))) {
              count++;
            }
          });

          if (count === 0) {
            requestedLink.id = requestedLinks.length;
            requestedLinks.push(requestedLink);
          } else {
            count = 0;
          }
        }


        res.render("index.ejs", {
          errMsg: "",
          requestedLinks: requestedLinks
        });

      });
    } else {
      res.render("index.ejs", {
        errMsg: "Invalid link!",
        requestedLinks: requestedLinks
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('The server is up and running.');
});
