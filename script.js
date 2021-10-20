const holes = document.querySelectorAll('.gamed');

const scores = document.querySelector('.count');

const mole = document.createElement("img");
mole.setAttribute("src", "img/mole.png");
mole.setAttribute("class", "mole");

let lastHole;

const timeGame = 15000;
let totalScore = 0;
let timeUp = false;
let isRemoved = false

function play()
{
    timeUp = false;
    totalScore = 0;
    scores.innerHTML = totalScore;
    game();
    setTimeout(() => timeUp = true, timeGame);
}
function game()
{
    const time = GetRandomTime(900, 1500);
    const hole = GetRandomHole(holes);
    hole.appendChild(mole);
    setTimeout(() => {
        if(!isRemoved)
            hole.removeChild(mole);
        if (!timeUp && totalScore < 10)
            game();
    }, time)
}
function GetRandomTime(min, max)
{
    return Math.round(Math.random() * (max - min) + min);
}
function GetRandomHole(holes)
{
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole)
    {
        return GetRandomHole(holes);
    }
    isRemoved = false;
    lastHole = hole;
    return hole;
}


holes.forEach(hole => hole.addEventListener("click", click));
function click(e)
{
    if (e.target === document.querySelector('.mole'))
    {
        totalScore++;
        if (totalScore >= 10)
            scores.innerHTML = "You win!"
        else
            scores.innerHTML = totalScore;
        this.removeChild(mole);
        isRemoved = true;
    }
}

