import Element from "./common/element.js"

const content = `
<style>
    #root{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    #playground{
    }

    @media (orientation: landscape){

        #playground{
            background: url(./res/l-field.jpg);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            height: 100%;
            aspect-ratio: 4/3;
        }
    
    }

    @media (orientation: portrait){
        #playground{
            background: url(./res/p-field.jpg);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 100%;
            aspect-ratio: 3/4;
        }
   }

   .number{
    font-family: Arial;
    font-size: 50%;
    font-weight: bold;
   }
</style>
<div id="root">
    <svg id="playground">
        <svg id="ball" width="3%" height="3%">
            <defs>
                <clipPath  patternUnits="userSpaceOnUse" id="clip">
                    <circle cx="50%" cy="50%" r="40%" ></circle>
                    </clipPath>
            </defs>

            <image href="./res/ball.png" width="100%" height="100%" clip-path="url(#clip)" />
        </svg>
    </svg>
</div>
`

export default class Field extends Element{
    constructor(){
        super(content)

        this.state = {
            team: 'a',
            ball: {x: 50, y: 50},
            positions: []
        }
    }

    control(){
        super.control()

        this.playground.onclick  = e => this.handlePlayground(e)
    }

    controlPlayers(){
        this.queryAll('.player').forEach(p => p.onclick = e => {
            e.stopPropagation()
            this.handlePlayer(p)
        })
    }

    get portrait(){
        return this.size.width < this.size.height
    }

    get playground (){
        return this.get('playground')
    }

    get ball(){
        return this.get('ball')
    }

    set position(value){
        let x = this.portrait ? 'x' : 'y'
        let y = this.portrait ? 'y' : 'x'
        let ycoord = this.portrait ? value.y : 100 - value.y

        this.ball.setAttribute(x, (value.x - 1.5) + '%')
        this.ball.setAttribute(y, (ycoord -  1.5) + '%')
    }

    forAllPlayers( handle ){
        Object.values(this.state.positions).forEach(p => handle(p))
    }

    player(data, color){
        let {x,y, number} = data
        let size = '4%'

        return this.portrait ? `<svg id="${number}" class="player" x="${x-1}%" y="${y-1}%" width="${size}" height="${size}"><rect width="100%" height="100%" fill="${color}" stroke="${color}" rx="20%"/><text class="number" x="0%" y="50%" width="100%" height="100%" fill="white">${number}</text></svg>`
                                : `<svg id="${number}" class="player" x="${y - 1}%" y="${99-x}%" width="${size}" height="${size}"><rect width="100%" height="100%" fill="${color}" stroke="${color}" rx="20%"/><text class="number" x="0%" y="50%" width="100%" height="100%" fill="white">${number}</text></svg>`
    }

    addPlayers(list, color){
        this.playground.innerHTML = list.map(item => this.player(item, color)).join('') + this.playground.innerHTML
    }

    set data(value){
            this.state.ball = value.ball
        this.state.positions = value.positions.reduce((d, item) => {d[item.number] = item; return d}, {})
   
        this.position = this.state.ball
        this.addPlayers(value.positions.filter(item => item.team == 'a'), 'red')
        this.addPlayers(value.positions.filter(item => item.team == 'b'), 'blue')

        this.resetPositions()

        this.controlPlayers()
    }


    movePlayer(player, item){
        let x = this.portrait ? 'x' : 'y'
        let y = this.portrait ? 'y' : 'x'
        let ycoord = this.portrait ? item.y : 100 - item.y

        player.setAttribute(x, item.x - 1 + '%')
        player.setAttribute(y, ycoord - 1 + '%')
    }

    resetPositions(){
        this.position = this.state.ball

        this.forAllPlayers(item => this.movePlayer(this.get(item.number), item) )
    }

    update(ball, position){
        this.updatePlayer(position)
        this.updateBall(ball)
    }

    updateBall(to){
        if (to){
            let from = {...this.state.ball}
            this.state.ball = to
            let delta = {x: (to.x - from.x)/127, y: (to.y - from.y)/127}

            this.animateBall(from, to, delta)
        }
    }

    animateBall(from, to, delta){
        let dx = Math.abs(from.x - to.x) > .1
        let dy = Math.abs(from.y - to.y) > .1
        if (dx)
            from.x += delta.x 

        if (dy)
            from.y += delta.y 

        this.position = from

        if (dx || dy)
            window.requestAnimationFrame(() => this.animateBall(from, to, delta))
    }

    updatePlayer(to){
        let from = this.state.positions[to.number]
        let delta = {x: (to.x - from.x)/127, y: (to.y - from.y)/127}

        this.state.positions[to.number] = to

        this.animatePlayer(this.get(to.number), from, to, delta )
    }

    animatePlayer(player, from, to, delta){
        let dx = Math.abs(from.x - to.x) > .1
        let dy = Math.abs(from.y - to.y) > .1
        if (dx)
            from.x += delta.x 

        if (dy)
            from.y += delta.y 

        this.movePlayer(player, from)

        if (dx || dy)
            window.requestAnimationFrame(() => this.animatePlayer(player, from, to, delta))
    }

    handlePlayer(p){
        this.state.team = this.state.positions[p.id].team
    }

    handlePlayground(e){
        let size = this.size
        let x = Math.floor( this.portrait ? (e.clientX * 100) / size.width : (e.clientY * 100) / size.height )
        let y = Math.floor( this.portrait ? (e.clientY * 100) / size.height : ((size.width - e.clientX) * 100) / size.width )

        this.onAction({x, y, team: this.state.team})
    }

    onResize(size){
        this.resetPositions()
    }

    onAction(_){}
}

window.customElements.define('gamia-field', Field)