var WebSocketClient = require('websocket').client;
const conf = require("./config.js");
const startExe = require("./workers/js/startExe.js");
const pcName =process.env.USERDOMAIN;
var client = new WebSocketClient();
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
    reconnect();
});

client.on('connect', function(ws) {
    console.log('WS conected to',conf.path);
    ws.on('error', function(error) {
        console.log("ws Error: " + error.toString());
    });
    ws.on('close', function() {
      //  console.log(' ws Closed');
      //
        reconnect();
        
    });
    ws.on('message', function(message) {
        const jsonMsg = JSON.parse(message.utf8Data);
      
        if (jsonMsg[0] =='auth' ) {
         }

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
     /////
           
   
      
    });
    

    function auth() {
        if (ws.connected) {
            var sendObj ={};
            sendObj.command = 'authPc';
            sendObj.pcName = pcName;
    ws.send(JSON.stringify(sendObj));

        }
    }
    auth();
});
function reconnect() {
    
    setTimeout(()=>{
        client.connect(conf.path);
        console.log('reconnected to' ,conf.path);
    }, 5000);

}

client.connect(conf.path);