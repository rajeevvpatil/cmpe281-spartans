// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();
const port           = 8080;

app.use(bodyParser.urlencoded({extended:"true"}));

MongoClient.connect(db.url, (err, database) => {
<<<<<<< Updated upstream
  if (err) return console.log(err);
=======
  if (err) return console.log(err)
>>>>>>> Stashed changes
require('./app/routes')(app, database);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
});
