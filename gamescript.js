const score=document.querySelector('.score')
const startScreen=document.querySelector('.startScreen')
const gameArea=document.querySelector('.gameArea')

startScreen.addEventListener('click',start)

let player={speed:5 , score:0}
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)

function keyDown(e){
    e.preventDefault()
    keys[e.key]=true
    // console.log(e.key)

    // console.log(keys)
}

function keyUp(e){
    e.preventDefault()
    keys[e.key]=false
    // console.log(e.key)
}

function collution(a,b){
    aReat=a.getBoundingClientRect()
    bReat=b.getBoundingClientRect()

    return !((aReat.bottom < bReat.top) || (aReat.top>bReat.bottom) || (aReat.left>bReat.right) || (aReat.right<bReat.left))
}

function movelines(){
    let lines=document.querySelectorAll('.lines')

    lines.forEach(function(item){
        if(item.y>=700){
            item.y-=750
        }
        item.y+=player.speed
        item.style.top=item.y+"px"

    })
}

function endGame(){
    player.start=false
    startScreen.classList.remove('hide')
    startScreen.innerHTML="Game Over <br> Your final Score is "+player.score+"<br>Press Here to restart the Game"

}

function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy')

    enemy.forEach(function(item){
        if(collution(car,item)){
            console.log('Boom hit')
            endGame()
        }
        if(item.y>=750){
            item.y= -300
            item.style.left=Math.floor(Math.random()*350)+"px"
        }
        item.y+=player.speed
        item.style.top=item.y+"px"

    })
}

function gamePlay(){
    // console.log('Allah  I wanna be tall')
    let car=document.querySelector('.car')
    let road=gameArea.getBoundingClientRect()
    // console.log(road)

    if(player.start){
        movelines()
        moveEnemy(car)
        if(keys.ArrowDown && player.y<(road.bottom-85)){
            player.y+=player.speed
        }
        if(keys.ArrowUp && player.y>(road.top+140)){
            player.y-=player.speed
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x<(road.width-50)){
            player.x+=player.speed
        }

        car.style.top=player.y+"px"
        car.style.left=player.x+"px"


        window.requestAnimationFrame(gamePlay)
        console.log(player.score++)

        player.score++
        let ps=player.score-2
        score.innerText="Score : "+ps
    }
}



function start(){
    startScreen.classList.add('hide')
    gameArea.innerHTML=""

    player.start=true
    player.score=0

    window.requestAnimationFrame(gamePlay)

    for(x=0;x<5;x++){
    let roadline=document.createElement('div')
    roadline.setAttribute('class','lines')
    roadline.y=(x*150)
    roadline.style.top=roadline.y+"px"
    gameArea.append(roadline)
    }
    

    let car=document.createElement('div')
    car.setAttribute('class','car')
    gameArea.appendChild(car)

    player.x=car.offsetLeft
    player.y=car.offsetTop

    for(x=0;x<3;x++){
        let enemycar=document.createElement('div')
        enemycar.setAttribute('class','enemy')
        enemycar.y=((x+1)*350)*-1
        enemycar.style.top=enemycar.y+"px"
        enemycar.style.backgroundColor = randomColor();
        enemycar.style.left=Math.floor(Math.random()*350)+"px"
        gameArea.append(enemycar)
        }
}


function randomColor(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16)

        return ("0"+String(hex)).substr(-2)
    }
    return "#"+c()+c()+c()
}
