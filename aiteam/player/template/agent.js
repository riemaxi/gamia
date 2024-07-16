const nextMove = require('./agent.move')

module.exports = class agent{
    constructor(config){
        this.number = config.number

    }

    init(data){
        this.setting = data.setting

        let position = data.state.positions.find(item => item.number == this.number)

        this.gate = position.team == 'a' ? {x: 50, y: 0} : {x: 50, y: 100}
        this.team = position.team
    }

   next(state, vantage, handle){
        let {position, ball} = nextMove(
            {setting: this.setting,  state},
            this.team, 
            this.gate,
            this.team == vantage?.team ? vantage : null, 
            state.ball.owner == this.number)

        handle( {position : {...position, number: this.number, team: this.team}, ball} )
    }
}