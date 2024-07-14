import Bra from "./bra/index.js"
import Ket from "./ket/index.js"

let ket = new class extends Ket{
    constructor(){
        super()
    }

    on(id, data){
        switch(id){
            case 'event' :  bra.sendEvent(data); break;
            case 'request' : bra.sendRequest(data); break;
        }
    }
}

let bra = new class extends Bra{
    constructor(){
        super()
    }

    onInit(data){
        ket.init(data)
    }

    onResponse(id, data){
        ket.response(id, data)
    }

    onEvent(id, data){
        ket.event(id, data)
    }
}