const express = require('express');
var mongoose = require('mongoose');
//const amqplib = require('amqplib');
var amqp = require('amqplib/callback_api');

var url_map_model = require('./app/models/url');

var message_content;

//Set up default mongoose connection
var mongoDB = 'mongodb://172.17.0.3/url_db';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Connecting to the RabbitMQ new shortlinks queue and making sure that it already exists
amqp.connect('amqp://172.17.0.2', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var exchange_name = 'new shortlinks';
  
        // To Confirm whether Exchange exists
        ch.assertExchange(exchange_name, 'fanout', {durable: false});
        
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

            //To bind the queue to the new shortlinks exchange
            ch.bindQueue(q.queue, exchange_name, '');

            //Consuming messages from the queue
            ch.consume(q.queue, function(msg) {

                message_content = msg.content.toString();
                console.log("Message Content is "+message_content);
                
                var json_message_received = JSON.parse(message_content);
                
                //instance with sample data
                console.log("Short URL is "+json_message_received.short_url);
                console.log("Long URL is "+json_message_received.original_url);
                
                var url_map_instance = new url_map_model({_id : json_message_received.short_url,original_url: json_message_received.original_url});
                
                url_map_instance.save(function (err){
                    if(err) {
                        console.log("Error is "+err);
                        console.error.bind(console, 'Short URL Already Exists:');    
                    }
                //else saved into the database
                })
                
            }, {noAck: true});
        });
    });
});