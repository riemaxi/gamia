module.exports = class{
    constructor(config){
        this.timer = setInterval(() => this.onTick(), config.duration)
    }

    onTick(_){}
}