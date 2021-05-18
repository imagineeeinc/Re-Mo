const path = require("path")
const { Server } = require("socket.io")
var moveCall = []

function startServer() {
    const express = require('express')
    const app = express()
    const port = 1851

    app.use(express.static("./public"))
    app.set('view engine', 'ejs')
    app.set('views', path.join(process.cwd() + "/pages"))

    app.get('/', (req, res) => {
        res.render('index', {})
    })

    let server = app.listen(port, () => {
        console.log(`Portal listening at http://localhost:${port}`)
    })
    const io = new Server(server)

    io.on('connection', (socket) => {
        console.log('a user connected to portal')

        socket.on('move mouse', (pos) => {
            moveCall(pos)
        })
        socket.on('click', (pos) => {
            pos.click = true
            moveCall(pos)
        })
        socket.on('disconnect', () => {
            console.log('user disconnected from portal');
        });
    })
}

function onMove(call) {
    moveCall = call
}
module.exports.startServer = startServer
module.exports.onMove = onMove