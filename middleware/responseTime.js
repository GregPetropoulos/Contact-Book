// MIDDLEWARE FOR RESPONSE TIME OF HTTP REQUEST
// const responseTime = require('response-time');
// const StatsD = require('node-statsd');
// const stats = new StatsD();

// stats.socket.on('error', function (error) {
//   console.error(error.stack);
// });


//    responseTime (function (req, res, time){
//     const stat = (req.method + req.url)
//       .toLowerCase()
//       .replace(/[:.]/g, '')
//       .replace(/\//g, '_');
//     stats.timing(stat, time);
//     console.log(time, stat);
//   });

// module.export = responseTime;
