const express = require('express');
var mongoose = require('mongoose');
//const amqplib = require('amqplib');
var amqp = require('amqplib/callback_api');

var url_map_model = require('./app/models/url');

var message_content;

//Set up default mongoose connection
//var mongoDB = 'mongodb://172.17.0.3/url_db';
var mongoDB = 'mongodb://mymongo/url_db';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Connecting to the RabbitMQ new shortlinks queue and making sure that it already exists

//amqp.connect('amqp://172.17.0.2', function(err, conn) {
amqp.connect('amqp://some-rabbit', function(err, conn) {
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

    //This Channel is for connecting to the "shortlinks used" queue
    conn.createChannel(function(err, ch) {
        var exchange_name = 'shortlinks used';
  
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


/*
//Connecting to the Main Database Server
MongoClient.connect("mongodb://ec2-54-183-199-29.us-west-1.compute.amazonaws.com/url_db", (err, database) => {
    if (err) return console.log(err)
    database.url_mapping.findOne({_id : short_url}, function(err, result) {
        if (err) throw err;
        console.log("Inside Trending Server "+result.original_url);
        
        var url_stat_data = {short_url:short_url, visit : 1};

        database.url_stats.insert(url_stat_data,(err) => {
            if(err) return console.log("Error Inserting into the URL_STATS "+err);
        })
        database.close();
    });
});
*/