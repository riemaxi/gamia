const config = require('./config')

let system = new class extends require('./system'){
    constructor(){
        super(config.system)
    }

    onDenied(data){
        console.log('denied to', this.address)
    }

    onGranted(data){
        console.log('granted to', this.address)
    }

    onResponse(r){
        let {id, to, data} = r.detail
        console.log('response', r)
        switch(id){
            case 'init' : desk.notify('init', to,  {session: {id: to}, game: data}); break;
            default: desk.notify('response', to, {id, data})
        }
           
    }

    onEvent(e){
        console.log('event', e)
        let {id, to, data} = e.detail
        switch(id){
            case 'transition' :  desk.notifyAll('event', {id, data}); break;
            default: to=='*'? desk.notifyAll('event', {id, data}) : desk.notify('event', to, {id, data});
        }
    }
   
}


class Session{
    constructor(socket, id){
        this.socket = socket
        this.id = id

        this.socket.on('event', data => this.onEvent(data))
        this.socket.on('request', data => this.onRequest(data))

        system.request({id: 'init', to: this.id})
    }

    onEvent({id, data}){
        system.notify({id, to: this.id, data})
    }

    onRequest({id, data}){
        system.request({id, to: this.id,  data})
    }


    notify(id, data){
        console.log(id, data)
        this.socket.emit(id, data)
    }

    close(){

    }
}

let desk = new class extends require('./desk'){
    constructor(){
        super(config.desk)
    }

    onListening(){
        console.log(config.desk.port)
    }

    openSession(socket, id){
        return new Session(socket, id)
    }

}