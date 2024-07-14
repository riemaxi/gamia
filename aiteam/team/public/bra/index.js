
export default class Bra{
    constructor(){
        this.socket = io()

        this.listen()
    }

    listen(){
        this.socket.on('init', data => this.onInit(data))
        this.socket.on('response', r  => this.onResponse(r.id, r.data))
        this.socket.on('event', e  => this.onEvent(e.id, e.data))
    }

    send(id, data){
        this.socket.emit(id, data)
    }

    sendRequest({id, data}){
        this.send('request', {id, data})
    }

    sendEvent({id, data}){
        this.send('event', {id, data})
    }

    onInit(_){}
    onResponse(_){}
    onEvent(_){}
}