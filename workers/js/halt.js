async function halt(command) {
const child_process = require('child_process');
const msg =  child_process.spawn('MSG',['*', 'ваше время вышло']);

if (command == 'reboot') {
const reboot = child_process.spawn('shutdown',['-r', '-t','1']);
reboot.on('error', (error) =>
console.log('err: \n', error)
);
}
if (command == 'shutDev') {
const shut = child_process.spawn('shutdown',['-s', '-t','0']);
shut.on('error', (error) =>
console.log('err: \n', error)
);
}


  }
  
  module.exports = halt;