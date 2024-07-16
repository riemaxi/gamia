const config = require('./config')

let game = new class extends require('./game'){
    constructor(){
        super(config.data.game)

        this.vantages = []
    }

    addVantage(v){
        this.vantages.push(v)
    }

    getVentage(){
        return this.vantages.pop()
    }

    onGoal(data){
        system.broadcast(system.peers.desks, {id: 'goal', to: '*',  data})
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
        this.broadcast(this.peers.players, {id: 'init', data: game.getData()})
        this.broadcast(this.peers.desks, {id: 'init', to: '*', data: game.getData()})
    }

    onRequest(r){
        switch(r.detail.id){
            case 'init' : this.response(r.from, {...r.detail, data: game.getData()}); break;
            case 'player.init' : this.response(r.from, {...r.detail, data: game.getData()}); break;
        }
    }

    onEvent(e){
        let {id, to, data} = e.detail
        switch(id){
            case 'action' : game.addVantage(data); break;
            case 'player.reaction': this.broadcast(this.peers.desks, {id: 'transition', to: '*', data : game.update(data)}); break;
            case 'tick' : this.broadcast(this.peers.players, {id: 'action', data: game.getVentage(), state: game.state}); break;
        }
    }

    broadcast(targets, data){
        targets.forEach(address => this.notify(address, data))
    }
}