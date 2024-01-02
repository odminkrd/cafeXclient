async function halt(command) {
var {spawn} = require('child_process');

if (command == 'reboot') {
  var spawn = await spawn("C:\\client\\workers\\exe\\nircmdc.exe",['exitwin','reboot','force']);     
  spawn.stdout.on('data', function(msg){ console.log(Date.now(),msg.toString())});
}
if (command == 'shutDev') {
  var spawn = await spawn("C:\\client\\workers\\exe\\nircmdc.exe",['exitwin','shutdown','force']);     
  spawn.stdout.on('data', function(msg){ console.log(Date.now(),msg.toString())});
}




  }
  
  module.exports = halt;