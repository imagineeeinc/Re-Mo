var socket = io();

const trackpad = document.getElementById("trackpad")

var mousepos = []
var draging = false

trackpad.addEventListener("mousedown", mouseDown)
trackpad.addEventListener("touchstart", mouseDown, false)
trackpad.addEventListener("mousemove", moveMouse)
trackpad.addEventListener("touchmove", moveTouch, false)
trackpad.addEventListener("mouseup", mouseUp)
trackpad.addEventListener("touchend", mouseUp, false)
trackpad.addEventListener("touchcancel", mouseUp, false)

function mouseDown(e) {
    draging = true
}
function mouseUp(e) {
    draging = false
}

function moveMouse(e) {
    if (draging === true) {
        mousepos = GetMousePosition(e.clientX,e.clientY)
        socket.emit('move mouse', mousepos)
    }   
}
function moveTouch(e) {
    if (draging === true) {
        mousepos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
        socket.emit('move mouse', mousepos)
    }   
}


function GetMousePosition(x,y){
    // Get canvas size and position in web page
    let canvasSizeData = trackpad.getBoundingClientRect();
    return { x: ((x - canvasSizeData.left) * (trackpad.width  / canvasSizeData.width))-(trackpad.width/2),
        y: ((y - canvasSizeData.top)  * (trackpad.height / canvasSizeData.height))-(trackpad.height/2)
    };
}