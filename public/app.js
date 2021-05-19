var socket = io();

const trackpad = document.getElementById("trackpad")

var mousepos = {x:0,y:0}
var mouseDownpos = {x:0,y:0}
var mouseUppos = {x:0,y:0}
var draging = false

trackpad.addEventListener("onclick", onClick)
trackpad.addEventListener("mousedown", mouseDown)
trackpad.addEventListener("touchstart", touchDown, false)
trackpad.addEventListener("mousemove", moveMouse)
trackpad.addEventListener("touchmove", moveTouch, false)
trackpad.addEventListener("mouseup", mouseUp)
trackpad.addEventListener("touchend", mouseUp, false)
trackpad.addEventListener("touchcancel", mouseUp, false)

function mouseDown(e) {
    draging = true
    setTimeout(clickIt, 300)
    mouseDownpos = GetMousePosition(e.clientX,e.clientY)
}
function touchDown(e) {
    draging = true
    mouseDownpos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
}
function mouseUp(e) {
    draging = false
    if (e.changedTouches[0]) {
        mouseUppos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
    } else {
        mouseUppos = GetMousePosition(e.clientX,e.clientY)
    }
    clickIt()
    mousepos = {x:0,y:0}
}
function touchUp(e) {
    draging = false
    mouseUppos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
    clickIt()
    mousepos = {x:0,y:0}
}
function clickIt() {
    if (draging === false) {
        if (isBetween(mouseUppos.x,mouseDownpos.x + 5,mouseDownpos.x - 5) && isBetween(mouseUppos.y,mouseDownpos.y + 5,mouseDownpos.y - 5)) {
            socket.emit('click')
        }
    }
}
function onClick() {
    console.log("clikty")
}

function moveMouse(e) {
    if (draging === true) {
        let pos = GetMousePosition(e.clientX,e.clientY)
        let distance = {x: pos.x-mousepos.x, y: pos.y-mousepos.y}
        if (mousepos.x == 0 || mousepos.y == 0) {
            distance = {x:0,y:0}
            socket.emit('move mouse', distance)
        } else if(null) {

        } else {
            socket.emit('move mouse', distance)
        }
        mousepos = pos
    }   
}
function moveTouch(e) {
    if (draging === true) {
        let pos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
        let distance = {x: pos.x-mousepos.x, y: pos.y-mousepos.y}
        if (mousepos.x == 0 || mousepos.y == 0) {
            distance = {x:0,y:0}
            socket.emit('move mouse', distance)
        } else {
            socket.emit('move mouse', distance)
        }
        mousepos = pos
    }   
}


function GetMousePosition(x,y){
    // Get canvas size and position in web page
    let canvasSizeData = trackpad.getBoundingClientRect();
    return { x: ((x - canvasSizeData.left) * (trackpad.width  / canvasSizeData.width)),//-(trackpad.width/2),
        y: ((y - canvasSizeData.top)  * (trackpad.height / canvasSizeData.height))//-(trackpad.height/2)
    };
}
function isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0
 }