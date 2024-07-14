const config = require('./config')

let agent = new class extends require('./agent'){
    constructor(){
        super(config.agent)
    }

}

let system = new class extends require('./system'){
    constructor(){
        super(config.system)
    }

    onDenied(data){
        console.log('denied to', this.address)
    }

    onGranted(data){
        console.log('granted to', this.address)
        this.request({id: 'player.init'})
    }

    onRequest(r){
        console.log('request', r)
        switch(r.detail.id){
        }
    }

    onResponse(r){
        let {id, data} = r.detail 
        switch(id){
            case 'player.init' : agent.init(data); break;
        }
    }

    onEvent(e){
        let {id, to, data, state} = e.detail
        switch(id){
            case 'init': agent.init(data); break;
            case 'action' : agent.next(state, data, data => this.notify({id: 'player.reaction', to, data})); break;
        }
    }
}