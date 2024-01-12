async function startExe(command,data) {
    var {spawn} = require('child_process');



if (command == 'PC_steam' ) {
  var spawn = await spawn("C:\\client\\workers\\exe\\satrt_steam.cmd",[data.pc_steam_user, data.pc_steam_pass]);     
  spawn.stdout.on('data', function(msg){ //console.log(Date.now(),msg.toString())
  });
   };

if ( command == 'RU_steam') {
  var spawn = await spawn("C:\\client\\workers\\exe\\satrt_steam.cmd",[data.ru_steam_user, data.ru_steam_pass]);     
  spawn.stdout.on('data', function(msg){ //console.log(Date.now(),msg.toString())
  });
    };


if (command == 'reboot') {
    var spawn = await spawn("C:\\client\\workers\\exe\\nircmdc.exe",['exitwin','reboot','force']);     
    spawn.stdout.on('data', function(msg){ console.log(Date.now(),msg.toString())});
  }

if (command == 'shutDev') {
    var spawn = await spawn("C:\\client\\workers\\exe\\nircmdc.exe",['exitwin','shutdown','force']);     
    spawn.stdout.on('data', function(msg){ console.log(Date.now(),msg.toString())});
  }

if (command == 'lastMin') {
    var spawn = await spawn("C:\\client\\workers\\exe\\notiTimeend.cmd");     
    spawn.stdout.on('data', function(msg){ console.log(Date.now(),msg.toString())});
  }
  if (command == 'lastSec') {
    var spawn = await spawn("C:\\client\\workers\\exe\\notiTimeendSec.cmd");     
    spawn.stdout.on('data', function(msg){ console.log(Date.now(),msg.toString())});
  }
if (command == 'admin') {
    var spawn = await spawn("C:\\client\\workers\\exe\\notiAdmin.cmd");     
    spawn.stdout.on('data', function(msg){ console.log(Date.now(),msg.toString())});
  }



//console.log("startexe->",'command->',command,"data->",data);


      }
      
      module.exports = startExe;