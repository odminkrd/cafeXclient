var WebSocketClient = require('websocket').client;
const halt = require("./workers/js/halt.js");
const eventActions = require("./workers/js/eventActions.js");
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
        console.log('echo-protocol Connection Closed');
        reconnect();
        
    });
    connection.on('message', function(message) {
        const jsonMsg = JSON.parse(message.utf8Data);
        if (jsonMsg.command =='mirrorCmd' ) {
           mirrorRouter(jsonMsg.btn)
        }
        if (jsonMsg.command =='servManager' ) {
            mirrorRouter(jsonMsg.event)
         }
        if (jsonMsg.command =='notification' ) {
            eventActions(jsonMsg.event)
         }
     
        console.log(jsonMsg);
           
       function mirrorRouter(command) {
        switch (command) {
            case "shutDev":
                console.log('halt ok!');   
                halt('shutDev'); 
                break;
            case "reboot":
                console.log('reboot ok!');   
                halt("reboot"); 
                break; 
            case "RU_ steam":
                console.log('RU_ steam-ok!');   
                eventActions('lastMin'); 
                break;    
        
            default:
                break;
        }
           
        
       }
      
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