var socket = io();

const trackpad = document.getElementById("trackpad")
trackpad.requestPointerLock = trackpad.requestPointerLock ||
                            trackpad.mozRequestPointerLock;

var mousepos = {x:0,y:0}
var mouseDownpos = {x:0,y:0}
var mdown = false
var mouseUppos = {x:0,y:0}
var draging = false
var rightc = false

trackpad.addEventListener("mousedown", mouseDown)
trackpad.addEventListener("contextmenu", rightClick)
trackpad.addEventListener("touchstart", touchDown, false)
trackpad.addEventListener("mousemove", moveMouse)
trackpad.addEventListener("touchmove", moveTouch, false)
trackpad.addEventListener("mouseup", mouseUp)
trackpad.addEventListener("touchend", mouseUp, false)
trackpad.addEventListener("touchcancel", mouseUp, false)

function mouseDown(e) {
    draging = true
    mdown = true
    mouseDownpos = GetMousePosition(e.clientX,e.clientY)
}
function touchDown(e) {
    draging = true
    mdown = true
    mouseDownpos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
    setTimeout(function(){
        let curpos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
        if (draging === true) {
            if (isBetween(curpos.x,mouseDownpos.x + 2,mouseDownpos.x - 2) && isBetween(curpos.y,mouseDownpos.y + 2,mouseDownpos.y - 2)) {
            }
        }
        draging = false
    }, 1500)
    setTimeout(function() {
        if (mdown === true) {
            mdown = true
        }
    },1600)
}
function mouseUp(e) {
    draging = false
    mdown = false
    if (e.changedTouches) {
        mouseUppos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
    } else {
        mouseUppos = GetMousePosition(e.clientX,e.clientY)
    }
    if (rightc === false) {
        clickIt()
    }
    rightc = false
    mousepos = {x:0,y:0}
}
function touchUp(e) {
    draging = false
    mdown = false
    mouseUppos = GetMousePosition(e.changedTouches[0].screenX,e.changedTouches[0].screenY)
    if (rightc === false) {
        clickIt()
    }
    rightc = false
    mousepos = {x:0,y:0}
}
function clickIt() {
    if (draging === false && mdown === false && rightc === false) {
        if (isBetween(mouseUppos.x,mouseDownpos.x + 5,mouseDownpos.x - 5) && isBetween(mouseUppos.y,mouseDownpos.y + 5,mouseDownpos.y - 5)) {
            socket.emit('click')
        }
    }
}
function rightClick(e) {
    e.preventDefault()
    socket.emit('right click')
    rightc = true
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