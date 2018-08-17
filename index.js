var http = require('http');
var amqp = require('amqplib/callback_api');

http.createServer(function (req, res) {
     amqp.connect('amqp://xxxxx:xxxx@localhost:5672', function (err, conn) {
       conn.createChannel(function (err, ch) {
         var q = 'lightQueue'
         ch.assertQueue(q, { durable: false});
         ch.sendToQueue(q, new Buffer('Turn on!'));
         console.log(" sent 'turn light on");
       });
     });

     res.write('Turned lights on!');
     res.end();
}).listen(3333);
