const config = require('./config')

let source = new class extends require('./source'){
    constructor(){
        super(config)
    }

    onTick(){
        system.notify({id: 'tick', data : Date.now()})        
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
    }

}