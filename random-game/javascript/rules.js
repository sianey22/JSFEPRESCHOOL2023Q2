const buttonStart = document.querySelector('.button-start');
const cardTable = document.querySelector('.card-table');
const gameFunction = document.querySelector('.game-function');
const timer = document.querySelector('.timer');
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const restart = document.querySelector('.reset');
const modal = document.querySelector(".win-modal-window");
const resultPoints = document.querySelector(".point");
const mainMenu = document.querySelector(".button-main-menu")

let firstCard;
let secondCard;
let count = 0;

const iconsArrayData = ["bird", "cow", "crab", "elephant", "frog", "monkey", "snake","whale"];

const doubleArray=iconsArrayData.concat(iconsArrayData);

const gameResult = [];

const findedCard = [];

const mixArray = (array) => { 
    return array.sort(() => Math.random() - 0.5); 
}; 

function calcTime(millis) {
    const time = Math.floor(millis / 1000);
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    const secondsResult = seconds < 10 ? `0${seconds}`: `${seconds}`;
    return `${minutes}:${secondsResult}` 
}

const flipCard = (card)=>{
    const back = card.querySelector(".card-back");
    const front = card.querySelector(".card-front");
    back.classList.toggle("flip-hidden");
    front.classList.toggle("flip-show");
    front.classList.toggle("flip-hidden");
    back.classList.toggle("flip-show");
}


const winModal = (point)=>{
    resultPoints.textContent=point;
    modal.classList.remove("hidden");

}

const localResult = (result)=>{
    if(gameResult.length==10){
        gameResult.pop();
    } 
    gameResult.unshift(result);
    if(localStorage.getItem("result")!=null){
        localStorage.removeItem("result");
    }
    localStorage.setItem("result", gameResult)
}

const ruleFunction = (el) => { 
    if (!findedCard.includes(el.classList[1]) && !el.querySelector(".card-front").classList.contains("flip-show")&&play.classList.contains("button-hidden")){
        if (count==0) {
            flipCard(el);
            firstCard = el;
            count+=1;
        }
        else if(count==1){
            flipCard(el);
            secondCard = el;

            if (firstCard.classList[1]==secondCard.classList[1]){
                count=0;
                findedCard.push(firstCard.classList[1]);
            }
            else{
                setTimeout(()=>flipCard(secondCard), 500);
                setTimeout(()=>flipCard(firstCard), 500)
                }
                count=0;
    }
    }
}

const createCard = (el)=>{ 
    const card = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardBack = document.createElement("div");

    cardFront.classList.add("card-front")
    cardBack.classList.add("card-back")
    card.classList.add("card")

    cardImg.src=`assets/cards/${el}.svg`;
    cardImg.alt=`${el} img`
    cardFront.appendChild(cardImg)
    card.classList.add(`${el}`)

    card.appendChild(cardBack);
    card.appendChild(cardFront);
    cardTable.appendChild(card);
}

const startGame=()=>{
    cardTable.innerHTML="";
    timer.innerHTML="0:00";
    findedCard.length=0;
    points=0;

    buttonStart.classList.add("hidden");
    cardTable.classList.remove("hidden");
    gameFunction.classList.remove("hidden");
    pause.classList.remove("button-hidden");
    play.classList.add("button-hidden");

    mixArray(doubleArray);
    
    doubleArray.map((el)=>{
        createCard(el);})

    let date = Date.now()
    let newDate;  
    let dateNext = 0; 
    let interval = setInterval(()=>{
        newDate = Date.now() - date;
        timer.innerHTML=String(calcTime(newDate));
    }, 1000)
    pause.addEventListener("click", ()=>{
        clearInterval(interval);
        pause.classList.add("button-hidden");
        play.classList.remove("button-hidden");
    })
    play.addEventListener("click", ()=>{
        let dateStart = Date.now();
        let dateNext;
        interval = setInterval(()=>{
            dateNext = (Date.now() - dateStart);
            timer.innerHTML=String(calcTime(dateNext+newDate));
        }, 1000)
        pause.classList.remove("button-hidden");
        play.classList.add("button-hidden");
    })
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener("click", ()=>{
            ruleFunction(card);
            if(findedCard.length==8){
                clearInterval(interval);
                winModal(String(calcTime(dateNext+newDate)));
                localResult(String(calcTime(dateNext+newDate)))
            }
        })
    }); 
    restart.addEventListener("click", ()=>{clearInterval(interval)});
}

const restartGame=()=>{
    buttonStart.classList.remove("hidden");
    cardTable.classList.add("hidden");
    gameFunction.classList.add("hidden");
}

const newGame = ()=>{
    modal.classList.add("hidden");
    startGame();
}

buttonStart.addEventListener("click", startGame);

restart.addEventListener("click", restartGame);

mainMenu.addEventListener("click", newGame);





