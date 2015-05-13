/**
 * Created by ricardomendes on 13/05/15.
 */
module.exports = function (io) {
    'use strict';
    
    var connections = 0;
    var statusdata = {};
    io.sockets.on('connection', function (socket) {
        socket.send('initialize');
        
        socket.on('gamepad', function (data) {
            console.log(data);
        });

        socket.on('disconnect', function () {            
            console.log('disconnect detected');        
        });
    });
};

