const fs = require('fs')

class DataObject{
    constructor(path){
        this.path = path
        this.data = JSON.parse(fs.readFileSync(path))
    }

    save(ready, path){
        fs.writeFile(path || this.path, JSON.stringify(this.data), e => ready && ready(e) )
    }
}

module.exports = class extends DataObject{
    constructor(config){
        super(config.path)

        this.kickDistance = this.data.setting.distance.kick

        let positions = this.data.state.positions
        positions.forEach( p => this.takeBall(p.x, p.y, p.number))
    }

    get state(){
        this.data.state.ball.owner = null
        this.data.state.positions.forEach( p => this.takeBall(p.x, p.y, p.number))
        return this.data.state
    }

    goal(ball){
        return 45 <= ball.x && ball.x <= 55 && (ball.y <= 2 || ball.y >= 98)
    }

    update(data){
        let position = data.position
        this.data.state.positions = [...this.data.state.positions.filter(item => item.number !== position.number), position]

        if (data.ball){
            this.state.ball = data.ball 

            if (this.goal(data.ball)){
                this.state.score[position.team] += 1
            }
        }
        return data
    }

    takeBall(x, y, number){
        let ball = this.data.state.ball
        if (!ball.owner && Math.abs(ball.x - x) <= this.kickDistance && Math.abs(ball.y - y) <= this.kickDistance)
            this.data.state.ball.owner = number
    }

    getData(){
        return this.data
    }

    onGoal(_){}
}