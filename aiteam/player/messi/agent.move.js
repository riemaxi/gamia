let listMates = (list, team) => {
  return list.filter(item => item.team == team)
}

chooseMate = (list, team) => {
  let mates = listMates(list, team)
  return mates[Math.floor(Math.random()*mates.length)]
}


module.exports = (data, team, gate, vantage, owner) => {
  let position = {x: Math.floor(Math.random()*100), y: Math.floor(Math.random()*100)}

  if (owner){
    let mate = chooseMate(data.state.positions, team)

    let goal = Math.random()*100 < 20
    let x = goal ? gate.x : mate.x
    let y = goal ? gate.y : mate.y

    if (vantage && Math.random()*100 > 50){
        x = vantage.x
        y = vantage.y 
    }

    return {position, ball: {x,y}}
}else
    return {position}

}