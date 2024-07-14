const express = require('express')

module.exports = class Desk{
    constructor(config){
        this.app = express()
        this.app.use(express.json())
        this.app.listen(config.port,  () => this.onListening())
    }

    onListening(){}
}