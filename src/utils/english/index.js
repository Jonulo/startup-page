import verbs from './verbsList'
import { Validator, cleanInputs, getElements, cleanStyles } from './domFunctions'
import { setData } from './storageData'

const formatNumber = number => (number < 10) ? "0"+number : number

function setAnswerInfo(domElements, errorMsg = "") {
    if(!errorMsg){
        domElements.resultAd.innerHTML =
            "<strong class='input--correct'> CORRECT</strong> Keep it doing well!"
        setTimeout(() => {
            cleanInputs(domElements)
            domElements.inputs.pastInput.focus()
        },1000)
    }else {
        domElements.resultAd.innerHTML =
            "<strong class='input--wrong'> Wrong</strong> "+errorMsg+" Answer"
        document.getElementById(errorMsg.toLowerCase()+"Ans").focus()
    }
}

function verbGenerator() {
    var x = Math.floor(Math.random() * verbs.length)
    document.querySelector(".currentVerb").innerHTML = "- "+verbs[x].present+" -"
    return verbs[x]
}

function checkAnswer(dataTest, currentVerb, domElements) {

    domElements.buttons.checkButton.addEventListener("click", () => {
        let spanish = domElements.inputs.spanishInput.value.toLowerCase().trimEnd()
        let past = domElements.inputs.pastInput.value.toLowerCase().trimEnd()
        let participle = domElements.inputs.participleInput.value.toLowerCase().trimEnd()

        cleanStyles()

        let inputValidator = Validator(spanish, past, participle)

        if(inputValidator === "correct inputs") {
            let answerValidator = Validator(spanish, past, participle, currentVerb)
            if(answerValidator === "correct answer") {
                domElements.dataTest.correctCounter.innerHTML = ++dataTest.correctAnswers
                setAnswerInfo(domElements)
                setTimeout(() => {
                    currentVerb = verbGenerator()
                }, 1000)
            }else {
                setAnswerInfo(domElements, answerValidator)
                domElements.dataTest.attemptsCounter.innerHTML = ++dataTest.failedAttempts
            }
        }else {
            domElements.resultAd.innerHTML =
                "<strong class='input--empty'> Fill</strong> "+ inputValidator +" field"
        }
    })
    document.getElementById("skipVerb").addEventListener("click", () => {
        
        domElements.dataTest.skippedCounter.innerHTML = ++dataTest.skippedVerbs
        setTimeout(() => {
            cleanInputs(domElements)
            cleanStyles()
            currentVerb = verbGenerator()
        },1000)
    })
}

function countDown() {
    let domElements = getElements()
    let checkButton = domElements.buttons.checkButton
    let skipButton = domElements.buttons.skipButton
    let startButton = domElements.buttons.startButton

    document.querySelector(".currentVerb").innerHTML = "Are you READY?"
    setData()

    startButton.addEventListener("click", () => {
        let formatDate = new Date().toString()
        let dataTest = {
            date: formatDate.substr(4, 11),
            correctAnswers: 0,
            failedAttempts: 0,
            skippedVerbs: 0,
        }
        let verb = verbGenerator()
        let timer = 15 * 1000

        cleanInputs(domElements)
        cleanStyles()
        domElements.buttons.startButton.disabled = true
        domElements.buttons.startButton.style.cursor = "not-allowed"
        Object.values(domElements.dataTest).forEach(val => val.innerHTML = '0')
        Object.values(domElements.inputs).forEach(val => {
            val.disabled = false
            val.style.cursor= "text"
        })
        domElements.inputs.pastInput.focus()
        checkAnswer(dataTest, verb, domElements)
        checkButton.disabled = false
        skipButton.disabled = false
        checkButton.style.cursor = "pointer"
        skipButton.style.cursor = "pointer"

        let timerInterval = setInterval(() => {
            timer -= 1000
            let minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60))
            let seconds = Math.floor((timer % (1000 * 60)) / 1000)
            document.getElementById("countdown").innerHTML = formatNumber(minutes)+":"+formatNumber(seconds)
            if(timer < 0) {
                setData(dataTest)
                document.getElementById("countdown").innerHTML = "00:00"
                document.querySelector(".currentVerb").innerHTML = "Click START to try again! "
                clearInterval(timerInterval)
                Object.values(domElements.inputs).forEach(val => {
                    val.disabled = true
                    val.style.cursor= "not-allowed"
                })
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
    countDown
}