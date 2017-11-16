const express        = require('express');
const bodyParser     = require('body-parser');
const CRC32          = require('crc-32');
var amqp = require('amqplib/callback_api'); //This is the RabbitMQ protocol to communicate with queues

const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  app.post('/new', (req, res) => {
    //create the new short link for the Long URL submitted
    var long_URL = req.body.originalURL
    console.log("Original URL submitted"+long_URL);
    
    //encoding the original URL
    var encoded_url = encodeURI(long_URL);

    //Finding the Checksum for the encoded URL using the crc-32
    var short_url = CRC32.str(encoded_url);
    console.log("The New Short URL is "+short_url);

    //To connect to rabbitMQ docker Container
    amqp.connect('amqp://172.17.0.3', function(err, conn) {
        conn.createChannel(function(err, ch) {
          var q = "new	shortlinks";
      
          ch.assertQueue(q, {durable: false});

          // Sending to the queue
          ch.sendToQueue(q, new Buffer(short_url));
          
          console.log(" [x] Sent the new short URL");
        });
      });

    res.send('Encoded URI is ' + encoded_url+' and the new Short URL is '+short_url);
  });
