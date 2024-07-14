class Desk extends require('./core/ns.desk'){
    constructor(config){
        super(config)

        this.capacity = config.capacity        
        this.sessions = {}
    }

    get size(){
        return Object.keys(this.sessions).length
    }

    onListening(){}

    notify(id, to, data){
        if (to == '*')
            this.notifyAll(id, data)
        else{
            let session = this.sessions[to]
            session?.notify(id, data)
        }
    }

    notifyAll(id, data){
        Object.values(this.sessions)
            .forEach(session => session.notify(id, data))
    }

    allow(socket, id){
        return this.size < this.capacity
    }

    createSession(socket, id){
        return this.allow(socket, id) ? this.sessions[id] = this.openSession(socket, id) : null
    }

    openSession(socket, id){ return null}

    onCloseSession(session, id){
        session.close()
        delete this.sessions[id]
    }
}

module.exports = Desk