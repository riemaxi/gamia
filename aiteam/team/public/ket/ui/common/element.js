export default class  Element extends HTMLElement{
    constructor(content){
        super()

        this.shadow = this.attachShadow({mode:"open"})

        let template = document.createElement('template')
        template.innerHTML = content
        this.shadow.appendChild(template.content.cloneNode(true))

        this.control()
    }

    get size(){
        let r = this.getBoundingClientRect()
        return { width: r.width, height: r.height}
    }

    control(){ 
        window.ondeviceorientation = () => this.onResize(this.size)
        window.onresize = () => this.onResize(this.size)
    }

    queryAll(exp){
        return [...this.shadow.querySelectorAll(exp)]
    }

    get(id){
        return this.shadow.getElementById(id)
    }

    set visible(value){
        this.style.display = value ? 'flex' : 'none'
    }

    hide(){
        this.visible = false
    }

    show(){
        this.visible = true
    }

    onResize(_){}
    
}