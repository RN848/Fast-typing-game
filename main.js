
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];

origWord = words.length

const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
}


// save score on local storge 
// first one 6 sec

let Lvl = ""
let sec = ""
let flag = true
let message = document.querySelector(".message")


const choose = document.addEventListener("click", addLvl, true)

function addLvl(e) {

    if (flag) {
        if (e.target.className == "first-span") {
            Lvl = e.target.innerHTML
            document.querySelectorAll(".first-span").forEach(e => e.remove())
            addToSpans(Lvl)

        } else if (e.target.className == "start") {
            Lvl = "Easy"
            addToSpans(Lvl)
        }
    }

}


function addToSpans(lvl) {

    sec = lvls[Lvl]
    flag = false

    document.querySelector(".message").innerHTML =
        `You Are Playing On <span class="lvl sec-span"></span> Level & You 
        Have <span class="seconds sec-span"></span> Seconds To Type The Word`

    let lvlNameSpan = document.querySelector(".message .lvl");
    lvlNameSpan.appendChild(document.createTextNode(Lvl))
    let secondsSpan = document.querySelector(".message .seconds");
    secondsSpan.appendChild(document.createTextNode(sec))
}

let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let progress = document.querySelector(".input-box span")

timeLeftSpan.innerHTML = sec
scoreTotal.innerHTML = words.length

input.onpaste = () => false


startButton.onclick = function () {
    this.remove();
    input.focus();
    genWords()

}


function genWords() {
    randWord = words[Math.floor(Math.random() * words.length)]
    wordIndex = words.indexOf(randWord)
    words.splice(wordIndex, 1)


    upcomingWords.innerHTML = ''

    theWord.innerHTML = randWord

    creatDivs(words)

    startPlay()


}

function creatDivs(words) {
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div")
        let text = document.createTextNode(words[i])
        div.appendChild(text)
        upcomingWords.appendChild(div)
    }

}


function startPlay() {

    timeLeftSpan.innerHTML = sec

    let count = setInterval(() => {

        timeLeftSpan.innerHTML--

        if (timeLeftSpan.innerHTML == 0) {
            clearInterval(count)

            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {

                progress.style.width = `${((origWord - words.length) / origWord) * 100}%`
                input.value = ''
                scoreGot.innerHTML++

                if (words.length > 0) genWords()
                else win()

            } else lose()
        }

    }, 1000)

}

function lose() {
    let span = document.createElement("span")
    let spanText = document.createTextNode("Game Over")
    span.className = "bad"
    span.appendChild(spanText)
    finishMessage.appendChild(span)
    upcomingWords.remove()
    theWord.remove()
    input.remove()

}

function win() {
    let span = document.createElement("span")
    let spanText = document.createTextNode("Congratz")
    span.className = "good"
    span.appendChild(spanText)
    finishMessage.appendChild(span)
    upcomingWords.remove()
    theWord.remove()
    input.remove()
}