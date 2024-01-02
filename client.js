var WebSocketClient = require('websocket').client;
const halt = require("./workers/js/halt.js");
const eventActions = require("./workers/js/eventActions.js");
const startExe = require("./workers/js/startExe.js");
const pcName =process.env.USERDOMAIN;
var client = new WebSocketClient();
console.log("client started");

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
    reconnect();
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log(' Connection Closed');
        reconnect();
        
    });
    connection.on('message', function(message) {
        const jsonMsg = JSON.parse(message.utf8Data);

        if (jsonMsg.command =='startExe' ) {
            startExe(jsonMsg.exeFile, jsonMsg.data)
         }
        if (jsonMsg.command =='mirrorCmd' ) {
            startExe(jsonMsg.btn)
        }
        if (jsonMsg.command =='servManager' ) {
            startExe(jsonMsg.event)
         }
        if (jsonMsg.command =='notification' ) {
            startExe(jsonMsg.event)
         }
         if (jsonMsg.command =='RU_steam' || jsonMsg.command =='PC_steam' ) {
            startExe(jsonMsg.command,jsonMsg.account);
         }
     
       console.log(jsonMsg);
           
   
      
    });
    

    function auth() {
        if (connection.connected) {
            var sendObj ={};
            sendObj.command = 'authPc';
            sendObj.pcName = pcName;
            sendObj.ip = '192.168.1.104';
    connection.send(JSON.stringify(sendObj));

        }
    }
    auth();
});
function reconnect() {
    
    setTimeout(()=>{
        client.connect('ws://192.168.1.11:9000/');
        console.log('reconnected...');
    }, 5000);

}
client.connect('ws://192.168.1.11:9000/');