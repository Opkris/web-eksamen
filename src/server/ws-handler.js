// const express_ws = require('express-ws');
//
//
// let ews;
//
// function init(app) {
//
//     ews = express_ws(app);
//
//     app.ws('/', function (socket, req) {
//         console.log('Established a new WS connection');
//
//         broadcastCount();
//
//         //close is treated specially
//         socket.on('close', () => {
//             broadcastCount();
//         });
//     });
// }
//
// function broadcastCount() {
//
//     const numberOfClients = ews.getWss().clients.size;
//     console.log('Going to broadcast message to ' + numberOfClients + ' clients');
//
//
//     ews.getWss().clients.forEach((client) => {
//         if (client.readyState === WS.OPEN) {
//             const json = JSON.stringify(msg);
//
//             console.log('Broadcasting to client: ' + JSON.stringify(msg));
//             client.send(json);
//         } else {
//             console.log('Client not ready');
//         }
//     });
//
//     ews.getWss().clients.forEach((client) => {
//         const data = JSON.stringify({userCount: n});
//
//         client.send(data);
//     });
// }
//
//
// module.exports = {init};