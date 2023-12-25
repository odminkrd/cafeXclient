async function halt(command = 'test') {
const child_process = require('child_process');


  console.log(process.env.USERDOMAIN);
  



//Переход в директорию /srv/app
//const cmd = child_process.spawn('shutdown',['-l']);

//cmd.on('error', (error) =>
  //  console.log('Cannot change dir: \n', error)
//);
console.log('halt file!',command);
//Получение списка файлов и директорий для Linux
//const ls = child_process.spawn('dir');

// ls.stdout.on('data', (data) =>
//     console.log('Files list: \n', data)
// );
// ls.stderr.on('error', (error) =>
//     console.log('Error: \n', error)
// );

  }
  
  module.exports = halt;