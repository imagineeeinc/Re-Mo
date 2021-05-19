const robot = require("robotjs")

//Move the mouse down by 500 pixels.
//robot.moveMouse(mouse.x,mouse.y-500);
//robot.mouseClick();
function moveMouse(pos) {
    let mouse = robot.getMousePos()
    robot.moveMouse(mouse.x+pos.x*4,mouse.y+pos.y*4)
    if (pos.click) {
        if (pos.click === true) {
            robot.mouseClick()
        }
    }
}

module.exports.move = moveMouse