const {Manager} = require('socket.io-client')
const msg = require('./message')

class Session{
	constructor(){
	}

	connect(host){
		let manager = new Manager(host)
		this.socket = manager.socket('/')
		this.socket.io.on('error', data => this.onError(data))
		this.socket.on('connect', () => this.onConnected(Date.now()))
		this.socket.on('granted', data => this.onGranted(data))
		this.socket.on('denied', data => this.onDenied(data))
		this.socket.on('data', data => this.onData(data, this.valid(data)))
		this.socket.on('signal', data => this.onSignal(data, this.valid(data)))
	}

	onError(_){}
	onConnected(_){}
	onGranted(_){}
	onDenied(_){}
	onData(data, valid){ this.onCommand(data, valid, false)}
	onSignal(data, valid){ this.onCommand(data, valid, true)}
	onCommand(data,valid, signal){}

	valid(data){
		return msg.valid(data)
	}

	send(id, data){
		this.socket.emit(id, data)
	}

	signin(data){
		this.send('signin', data)
	}

	signoff(data){
		this.send('signoff', data)
	}
}

module.exports = Session
