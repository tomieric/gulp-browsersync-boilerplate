/**
 * fork npm package anywhere 
 */

var os = require('os');

/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
var getIPAddress = function () {
  var ifaces = os.networkInterfaces();
  var ip = '', result = [];
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
        //result.push(details)
      }
    });
  }

  //if(result.length > 0) ip = result.reverse()[0].address;

  return ip || "127.0.0.1";
};

module.exports = getIPAddress;