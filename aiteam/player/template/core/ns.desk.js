//non secure desk
const http = require('http')
const xpr = require('express')
const socket = require('socket.io')
const {v4 : uuid} = require('uuid')

class Desk{
	constructor(config){
		this.server = xpr()
		this.server.use(xpr.static(config.home))

		this.listen(config.port)
	}

	listen(port){
		let app = http.createServer(this.server)

		this.dispatch(socket(app))

		app.listen(port, () => this.onListening(port))
	}

	dispatch(io){
		io.on('connection', socket => {
			let id = this.getSessionId()
			let session = this.createSession(socket, id)

			if (session)
				socket.on('disconnect', () => this.onCloseSession(session, id))
			else
				socket.disconnect()
		})
	}

	onListening(){}

	onCloseSession(_){}
	createSession(_){}
	getSessionId(){
		return uuid()
	}

}

module.exports = Desk
