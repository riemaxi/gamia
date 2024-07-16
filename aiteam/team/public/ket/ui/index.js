
import Field from "./field.js"

export default class UI{
    constructor(){
       this.field = document.getElementById('field')

       this.field.onAction = p => this.onAction(p)
    }

    doTransition(data){
        this.field.update(data.ball, data.position)
    }

    doGoal(data){
        console.log('goal!!!', data)
    }

    set data(value){
        let {setting,  state} = value
        let {time, period, score, ball, positions} = state

        this.field.data = {ball, positions}
    }

    update(id, data){
        switch(id){
            case 'reset' : this.data = data; break;
            case 'start' : console.log('start'); break;
            case 'transition': this.doTransition(data); break;
            case 'goal' : this.doGoal(data); break;
            case 'score' : console.log('score', data); break;
            case 'period' : console.log('period'); break;
            case 'end' : console.log('end'); break;
        }
    }

    onAction(_){}
}