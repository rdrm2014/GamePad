/**
 * Created by ricardomendes on 13/05/15.
 * https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html
 */
var hasGP = false;
var repGP;

function canGame() {
    return "getGamepads" in navigator;
}

function reportOnGamepad() {
    var gp = navigator.getGamepads()[0];

    socket.emit('gamepad', {'button1':(gp.buttons[0].pressed) ? true : false});
    
    $("#button1").css({'color': (gp.buttons[0].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#button2").css({'color': (gp.buttons[1].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#button3").css({'color': (gp.buttons[2].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#button4").css({'color': (gp.buttons[3].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonL1").css({'color': (gp.buttons[4].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonR1").css({'color': (gp.buttons[5].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonL2").css({'color': (gp.buttons[6].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonR2").css({'color': (gp.buttons[7].pressed) ? '#2989d8' : '#5a5a5a'});
    $("#buttonSelect").css({'color': (gp.buttons[8].pressed) ? '#2989d8' : '#4d4d4d'});
    $("#buttonStart").css({'color': (gp.buttons[9].pressed) ? '#2989d8' : '#4d4d4d'});
    $("#buttonLeftStick").css({'color': (gp.buttons[10].pressed) ? '#2989d8' : '#4d4d4d'});
    $("#buttonRightStick").css({'color': (gp.buttons[11].pressed) ? '#2989d8' : '#4d4d4d'});

    $("#stick2").css({'color': (gp.axes[2]!=0 && gp.axes[3]!=0) ? '#2989d8' : '#4d4d4d'})
        .text("x1: " + gp.axes[3] + " y1: " + gp.axes[2]);

    $("#stick3").css({'color': (gp.axes[4]!=0 && gp.axes[5]!=0) ? '#2989d8' : '#4d4d4d'})
        .text("x2: " + gp.axes[4] + " y2: " + gp.axes[5]);    
}

$(document).ready(function() {

    if(canGame()) {
        console.log("Iniciar GamePad!");

        $(window).on("gamepadconnected", function() {
            hasGP = true;
            console.log("Gamepad ligado!");
            repGP = window.setInterval(reportOnGamepad,100);
        });

        $(window).on("gamepaddisconnected", function() {
            console.log("Iniciar GamePad!");
            window.clearInterval(repGP);
        });

        var checkGP = window.setInterval(function() {
            console.log('checkGP');
            if(navigator.getGamepads()[0]) {
                if(!hasGP) $(window).trigger("gamepadconnected");
                window.clearInterval(checkGP);
            }
        }, 500);
    }
});