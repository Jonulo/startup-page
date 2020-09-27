import verbs from './verbsList'
import { Validator,cleanInputs,getElements,cleanStyles } from './domFunctions'

function checkAnswer(domElements, errorMsg = "") {
    if(!errorMsg){
        domElements.resultAd.innerHTML =
            "<strong class='input--correct'> Correct!</strong> Keep it doing well!"
        setTimeout(() => cleanInputs(domElements),2000)
    }else {
        domElements.resultAd.innerHTML =
            "<strong class='input--wrong'> Wrong</strong> "+errorMsg+" Answer"
    }
}

function verbGenerator() {
    var x = Math.floor(Math.random() * 10)
    document.querySelector(".currentVerb").innerHTML = verbs[x].present
    return verbs[x]
}

function Answer() {
    let currentVerb = verbGenerator()
    let domElements = getElements()
    document.getElementById("check").addEventListener("click", () => {
        let present = domElements.inputs.presentInput.value.toLowerCase().trimEnd()
        let past = domElements.inputs.pastInput.value.toLowerCase().trimEnd()
        let participle = domElements.inputs.participleInput.value.toLowerCase().trimEnd()

        cleanStyles() // correct place to execute??

        let inputValidator = Validator(present, past, participle)

        if(inputValidator === "correct inputs") {
            let answerValidator = Validator(present, past, participle, false, currentVerb)
            if(answerValidator === "correct answer") {
                checkAnswer(domElements)
                setTimeout(() => currentVerb = verbGenerator(), 2000)
            }else {
                checkAnswer(domElements, answerValidator)
            }
        }else {
            domElements.resultAd.innerHTML =
                "<strong class='input--empty'> Fill</strong> "+ inputValidator +" field"
        }
    })
}

export {
    verbGenerator,
    Answer,
}