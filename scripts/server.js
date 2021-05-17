const path = require("path")
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

    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })
}

module.exports.startServer = startServer