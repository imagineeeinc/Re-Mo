var curX = 0
var curY = 0
var tap = false

interact('#trackpad').draggable({
    max: Infinity,
    maxPerElement: Infinity,
    origin: 'self',
    listeners: {
        move: function (event) {
            curX = event.dx
            curY = event.dy
            console.log([curX, curY])
        }
    }
}).on('doubletap', function (event) {
})

// interact.js can also add DOM event listeners
//interact(window).on('resize', resizeCanvases)
