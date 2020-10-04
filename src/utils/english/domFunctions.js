const errorsmsg = {
    spanish: 'SPANISH',
    past: 'PAST',
    participle: 'PARTICIPLE'
}

function Validator(spa, pa, par, e = true, currentVerb = "") {
    /* 
        this function validate if any input is empty or
        if the answer is wrong.
    */
   let evaluated = ""
   if(e) {
        evaluated = pa !== "" 
                        ? par !== ""
                            ? spa !== ""
                                ? "correct inputs"
                            : wrongInputs(getElements().inputs.spanishInput, errorsmsg.spanish, e)
                        : wrongInputs(getElements().inputs.participleInput, errorsmsg.participle, e)
                    : wrongInputs(getElements().inputs.pastInput, errorsmsg.past, e)
   }else {
        evaluated = pa === currentVerb.past.toLowerCase()
                        ? par === currentVerb.participle.toLowerCase()
                            ? spa === currentVerb.spanish.toLowerCase()
                                ? "correct answer"
                            : wrongInputs(getElements().inputs.spanishInput, errorsmsg.spanish, e)
                        : wrongInputs(getElements().inputs.participleInput, errorsmsg.participle, e)
                    : wrongInputs(getElements().inputs.pastInput, errorsmsg.past, e)
   }
   return evaluated
}

function cleanInputs(domElements) {
    domElements.inputs.spanishInput.value = ''
    domElements.inputs.pastInput.value = ''
    domElements.inputs.participleInput.value = ''
    domElements.resultAd.innerHTML = ''
}

const getElements = () => {
    return {
        inputs : {
            spanishInput : document.getElementById("spanishAns"),
            pastInput : document.getElementById("pastAns"),
            participleInput : document.getElementById("participleAns"),
        },
        buttons: {
            checkButton : document.getElementById("check"),
            skipButton : document.getElementById("skipVerb"),
            startButton : document.getElementById("startTest")
        },
        dataTest: {
            correctCounter: document.getElementById("correctCounter"),
            attemptsCounter: document.getElementById("attemptsCounter"),
            skippedCounter: document.getElementById("skippedCounter")
        },
        resultAd : document.querySelector(".answer-status"),
    }
}

function wrongInputs(element, msg, e) {
    if(e) {
        element.classList.add("input--empty")
    }else {
        element.classList.add("input--wrong")
    }
    return msg
}

function cleanStyles() {
    Object.values(getElements().inputs).forEach(val => {
        val.classList.remove("input--empty")
        val.classList.remove("input--wrong")
    })
}

export {
    Validator,
    cleanInputs,
    getElements,
    wrongInputs,
    cleanStyles
}