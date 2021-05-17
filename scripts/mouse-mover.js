const robot = require("robotjs")
var mouse = robot.getMousePos();

//Move the mouse down by 500 pixels.
//robot.moveMouse(mouse.x,mouse.y-500);
robot.mouseClick();

module.exports = {
}