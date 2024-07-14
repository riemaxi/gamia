import UI from "./ui/index.js"

let ui = new class extends UI{
    constructor(){
        super()
    }
}

export default class Ket{
    constructor (){

        ui.onAction = p => this.on('event', {id: 'action', data: p})
    }

    init(data){
        this.sesssion = data.session

        ui.data = data.game

    }

    response(id, data){
        console.log('response', id, data)
    }

    event(id, data){
        ui.update(id, data)
    }

    on(_){}
}
