async function eventActions(command) {
    const child_process = require('child_process');
    console.log('eventActions', command);
    if (command == 'admin') {
    const msg =  child_process.spawn('MSG',['*', 'Режим администратора']);
    msg.on('error', (error) =>
    console.log('err: \n', error)
    );
    }

    if (command == 'lastMin') {
      const msg =  child_process.spawn('MSG',["*", "Время на исходе"]);
      msg.on('error', (error) =>
      console.log('err: \n', error)
      );
      }

      }
      
      module.exports = eventActions;