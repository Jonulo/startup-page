import verbs from './verbsList'
import { Validator, cleanInputs, getElements, cleanStyles } from './domFunctions'

const formatNumber = number => (number < 10) ? "0"+number : number

function setAnswerInfo(domElements, errorMsg = "") {
    if(!errorMsg){
        domElements.resultAd.innerHTML =
            "<strong class='input--correct'> CORRECT</strong> Keep it doing well!"
        setTimeout(() => {
            cleanInputs(domElements)
            domElements.inputs.pastInput.focus()   
        },2000)
    }else {
        domElements.resultAd.innerHTML =
            "<strong class='input--wrong'> Wrong</strong> "+errorMsg+" Answer"
    }
}

function verbGenerator() {
    var x = Math.floor(Math.random() * 10)
    document.querySelector(".currentVerb").innerHTML = "- "+verbs[x].present+" -"
    return verbs[x]
}

function skipVerb(dataTest, domElements) {
    document.getElementById("skipVerb").addEventListener("click", () => {
        
        domElements.dataTest.skippedCounter.innerHTML = ++dataTest.skippedVerbs
        setTimeout(() => {
            cleanInputs(domElements)
            cleanStyles()
            ++dataTest.verbsGenerated
            checkAnswer(dataTest, verbGenerator(), domElements)
        },1000)
    })
}

function checkAnswer(dataTest, currentVerb, domElements) {

    domElements.buttons.checkButton.addEventListener("click", () => {
        let spanish = domElements.inputs.spanishInput.value.toLowerCase().trimEnd()
        let past = domElements.inputs.pastInput.value.toLowerCase().trimEnd()
        let participle = domElements.inputs.participleInput.value.toLowerCase().trimEnd()

        cleanStyles()

        let inputValidator = Validator(spanish, past, participle)

        if(inputValidator === "correct inputs") {
            domElements.dataTest.attemptsCounter.innerHTML = ++dataTest.attempts
            let answerValidator = Validator(spanish, past, 
                participle, false, currentVerb)
            if(answerValidator === "correct answer") {
                domElements.dataTest.correctCounter.innerHTML = ++dataTest.correctAnswers
                setAnswerInfo(domElements)
                setTimeout(() => {
                    currentVerb = verbGenerator()
                    ++dataTest.verbsGenerated
                }, 2000)
            }else {
                setAnswerInfo(domElements, answerValidator)
            }
        }else {
            domElements.resultAd.innerHTML =
                "<strong class='input--empty'> Fill</strong> "+ inputValidator +" field"
        }
    })
}

function countDown() {
    let domElements = getElements()
    let checkButton = domElements.buttons.checkButton
    let skipButton = domElements.buttons.skipButton
    let startButton = domElements.buttons.startButton

    document.querySelector(".currentVerb").innerHTML = "Are you READY?"

    startButton.addEventListener("click", () => {
        let dataTest = {
            date: new Date(),
            correctAnswers: 0,
            attempts: 0,
            skippedVerbs: 0,
            verbsGenerated: 0,
        }
        let verb = verbGenerator()
        let timer = 150 * 1000

        Object.values(domElements.dataTest).forEach(val => val.innerHTML = '0')
        checkAnswer(dataTest, verb, domElements)
        skipVerb(dataTest, domElements)
        checkButton.disabled = false
        skipButton.disabled = false
        checkButton.style.cursor = "pointer"
        skipButton.style.cursor = "pointer"

        let timerInterval = setInterval(() => {
            domElements.buttons.startButton.disabled = true
            domElements.buttons.startButton.style.cursor = "not-allowed"
            timer -= 1000
            let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60))
            let seconds = Math.floor((timer % (1000 * 60)) / 1000)
            document.getElementById("countdown").innerHTML = formatNumber(minutes)+":"+formatNumber(seconds)
            if(timer < 0) {
                console.log(dataTest)
                document.getElementById("countdown").innerHTML = "00:00"
                document.querySelector(".currentVerb").innerHTML = "Click START to try again! "
                clearInterval(timerInterval)
                domElements.buttons.startButton.disabled = false
                domElements.buttons.startButton.style.cursor = "pointer"
                checkButton.disabled = true
                skipButton.disabled = true
                checkButton.style.cursor = "not-allowed"
                skipButton.style.cursor = "not-allowed"
            }
        },1000)
    })
}

export {
    checkAnswer,
    skipVerb,
    countDown
}