import easy_verbs from './verbs_lists/easy_verbs'
import medium_verbs from './verbs_lists/medium_verbs'
import hard_verbs from './verbs_lists/hard_verbs'
import { Validator, cleanInputs, getElements, cleanStyles } from './domFunctions'
import { setData } from './storageData'

var failedVerbsList = []
var chosenDifficulty = null

function fillFailedVerbsTable() {
  let output = null
  let failedVerbs = failedVerbsList
  const failedVerbsTable = document.getElementById("failedVerbsTable")
  console.log("failed verbs", failedVerbs)
  output = `
    <tr>
      <th>Present</th>
      <th>Past</th>
      <th>Participle</th>
      <th>Spanish</th>
    </tr>
  `
  failedVerbs.forEach((verb, i) => {
    output += `
      <tr>
        <td>
          <a 
          href="https://translate.google.com/#view=home&op=translate&sl=en&tl=es&text=${verb.present}"
          target="_blank"
          class="${(failedVerbs[verb.present] > 0 && failedVerbs[verb.present] <= 5) 
                  ? 'low-failure' : (failedVerbs[verb.present] > 5 && failedVerbs[verb.present] <= 10)
                  ? 'high-failure' : 'no-failure' }"
          >
            ${verb.present}
          </a>
        </td>
        <td>${verb.past}</td>
        <td>${verb.participle}</td>
        <td>${verb.spanish}</td>
      </tr>
    `
  })
  failedVerbsTable.innerHTML = output
}
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
    if(chosenDifficulty === "easy") {
      var x = Math.floor(Math.random() * easy_verbs.length)
      document.querySelector(".currentVerb").innerHTML = "- "+easy_verbs[x].present+" -"
      return easy_verbs[x]
    } else if(chosenDifficulty === "medium") {
      var x = Math.floor(Math.random() * medium_verbs.length)
      document.querySelector(".currentVerb").innerHTML = "- "+medium_verbs[x].present+" -"
      return medium_verbs[x]
    } else if(chosenDifficulty === "hard") {
      var x = Math.floor(Math.random() * hard_verbs.length)
      document.querySelector(".currentVerb").innerHTML = "- "+hard_verbs[x].present+" -"
      return hard_verbs[x]
    } else {
      console.error("error choosing difficulty")
    }

}

function checkAnswer(dataTest, currentVerb, domElements, failedVerbs) {

    domElements.buttons.checkButton.addEventListener("click", () => {
        let spanish = domElements.inputs.spanishInput.value.toLowerCase().trimEnd()
        let past = domElements.inputs.pastInput.value.toLowerCase().trimEnd()
        let participle = domElements.inputs.participleInput.value.toLowerCase().trimEnd()

        cleanStyles()

        let inputValidator = Validator(spanish, past, participle)

        let failedVerbExists = failedVerbs[currentVerb.present]
  
        if(inputValidator === "correct inputs") {
            let answerValidator = Validator(spanish, past, participle, currentVerb)
            if(answerValidator === "correct answer") {
                if(typeof failedVerbExists !== 'undefined') {
                  if(failedVerbs[currentVerb.present] > 0) {
                    failedVerbs[currentVerb.present] = --failedVerbs[currentVerb.present]  
                  }
                }
                domElements.dataTest.correctCounter.innerHTML = ++dataTest.correctAnswers
                setAnswerInfo(domElements)
                setTimeout(() => {
                    currentVerb = verbGenerator()
                }, 1000)
            }else {
                if(typeof failedVerbExists === 'undefined') {
                  failedVerbs[currentVerb.present] = 0
                }
                if(failedVerbs[currentVerb.present] <= 10){                
                  failedVerbs[currentVerb.present] = ++failedVerbs[currentVerb.present]
                }
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
        if(typeof failedVerbExists === 'undefined') {
          failedVerbs[currentVerb.present] = 0
         }
        if(failedVerbs[currentVerb.present] <= 10){                
          failedVerbs[currentVerb.present] = ++failedVerbs[currentVerb.present]
        }
        console.log("currentVerb", currentVerb)
        failedVerbsList.push(currentVerb)
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
    const tableBtn = document.getElementById("tableBtn")
    
    document.querySelector(".currentVerb").innerHTML = "Are you READY?"
    setData()

    startButton.addEventListener("click", () => {
        const easyDifficult = document.getElementById("easy-verbs")
        const mediumDifficult = document.getElementById("medium-verbs")
        const hardDifficult = document.getElementById("hard-verbs")
        // let chosenDifficulty = ""

        if(easyDifficult.checked) {
          chosenDifficulty = easyDifficult.value 
        } else if(mediumDifficult.checked) {
          chosenDifficulty = mediumDifficult.value 
        } else if(hardDifficult.checked){
          chosenDifficulty = hardDifficult.value
        } else {
          console.log("error choosing difficult")
        }

        console.log(chosenDifficulty)
        let formatDate = new Date().toString()
        let dataTest = {
            date: formatDate.substr(4, 11),
            correctAnswers: 0,
            failedAttempts: 0,
            skippedVerbs: 0,
        }
        let failedVerbs = JSON.parse(localStorage.getItem("failedVerbs")) || {}
        let verb = ""
        verb = verbGenerator()
        failedVerbsList = []
        let timer = 210 * 1000
        cleanInputs(domElements)
        cleanStyles()
        domElements.buttons.startButton.disabled = true
        domElements.buttons.startButton.style.cursor = "not-allowed"
        tableBtn.disabled = true
        tableBtn.style.cursor = "not-allowed"
        Object.values(domElements.dataTest).forEach(val => val.innerHTML = '0')
        Object.values(domElements.inputs).forEach(val => {
            val.disabled = false
            val.style.cursor= "text"
        })
        domElements.inputs.pastInput.focus()
        checkAnswer(dataTest, verb, domElements, failedVerbs)
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
                setData(dataTest, failedVerbs)
                document.getElementById("countdown").innerHTML = "00:00"
                document.querySelector(".currentVerb").innerHTML = "Click START to try again! "
                clearInterval(timerInterval)
                Object.values(domElements.inputs).forEach(val => {
                    val.disabled = true
                    val.style.cursor= "not-allowed"
                })
                domElements.buttons.startButton.disabled = false
                domElements.buttons.startButton.style.cursor = "pointer"
                tableBtn.disabled = false
                tableBtn.style.cursor = "pointer"
                checkButton.disabled = true
                skipButton.disabled = true
                checkButton.style.cursor = "not-allowed"
                skipButton.style.cursor = "not-allowed"
                fillFailedVerbsTable()
            }
        },1000)
    })
}
  
export {
    checkAnswer,
    countDown
}
