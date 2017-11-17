const fs = require('fs');
const express        = require('express');
const bodyParser     = require('body-parser');
const CRC32          = require('crc-32');
var amqp = require('amqplib/callback_api'); //This is the RabbitMQ protocol to communicate with queues
var cors = require('cors');
var path = require('path');


const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));

//The below content is to configure the COR's properly
app.use(cors()); 
app.use(express.static(path.join(__dirname, '../')));

app.get('/', function (req, res) { 
  res.writeHead(200, {'Content-Type': 'text/plain'});
  contents = fs.readFileSync('sliderImages.json', 'utf8');
  res.end(contents);
});

//app.listen(process.env.PORT || 8080);

const port = 8000;

app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  app.post('/new', (req, res) => {
    //create the new short link for the Long URL submitted
    console.log("Inside the New EndPoint")
    var long_URL = req.body.originalURL
    console.log("Original URL submitted"+long_URL);
    
    //encoding the original URL
    var encoded_url = encodeURI(long_URL);

    //Finding the Checksum for the encoded URL using the crc-32
    var short_url = CRC32.str(encoded_url);
    console.log("The New Short URL is "+short_url);

    //To connect to rabbitMQ docker Container
    amqp.connect('amqp://172.17.0.2', function(err, conn) {
      console.log('connected to rabbitmq');
        conn.createChannel(function(err, ch) {
          var queue_name = "new shortlinks";
      
          //ch.assertQueue(q, {durable: false});
          ch.assertExchange(queue_name, 'fanout', {durable: false})

          var message_sent = JSON.stringify({"short_url": short_url, "original_url": encoded_url});

          console.log("Message Being Sent "+message_sent)

          // Sending to the queue
          //ch.sendToQueue(q, new Buffer(message_sent));
          ch.publish(queue_name, '', new Buffer(message_sent));

          console.log(" [x] Sent the new short URL");          
        });
      });
    
    //Response to be sent
    res.send({"Short URL": "shrink.com/"+short_url});
      
  });
