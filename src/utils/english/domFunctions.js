const errorsmsg = {
    emptyPresent: 'PRESENT',
    emptyPast: 'PAST',
    emptyParticiple: 'PARTICIPLE',
    wrongPresent: 'PRESENT',
    wrongPast: 'PAST',
    wrongParticiple: 'PARTICIPLE',
}

function Validator(p, pa, par, e = true, currentVerb = "") {
    /* 
        this function validate if any input is empty or
        if the answer is wrong.
    */
   let evaluated = ""
   if(e) {
        evaluated = p !== "" 
                        ? pa !== ""
                            ? par !== ""
                                ? "correct inputs"
                            : wrongInputs(getElements().inputs.participleInput, errorsmsg.emptyParticiple, e)
                        : wrongInputs(getElements().inputs.pastInput, errorsmsg.emptyPast, e)
                    : wrongInputs(getElements().inputs.presentInput, errorsmsg.emptyPresent, e)
   }else {
        evaluated = p === currentVerb.present.toLowerCase()
                        ? pa === currentVerb.past.toLowerCase()
                            ? par === currentVerb.parti.toLowerCase()
                                ? "correct answer"
                            : wrongInputs(getElements().inputs.participleInput, errorsmsg.wrongParticiple, e)
                        : wrongInputs(getElements().inputs.pastInput, errorsmsg.wrongPast, e)
                    : wrongInputs(getElements().inputs.presentInput, errorsmsg.wrongPresent, e)
   }
   return evaluated
}

function cleanInputs(domElements) {
    domElements.inputs.presentInput.value = ''
    domElements.inputs.pastInput.value = ''
    domElements.inputs.participleInput.value = ''
    domElements.resultAd.innerHTML = ''
}

const getElements = () => {
    return {
        inputs : {
            presentInput : document.getElementById("presentAns"),
            pastInput : document.getElementById("pastAns"),
            participleInput : document.getElementById("participleAns"),
        },
        resultAd : document.querySelector(".answer-status")
    }
}

function wrongInputs(element, msg, e) {
    if(e) {
        //empty
        element.classList.add("input--empty")
    }else {
        //wrong answers
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