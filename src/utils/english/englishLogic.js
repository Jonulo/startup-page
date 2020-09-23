import verbs from './verbsList'

function verbGenerator() {
    var x = Math.floor(Math.random() * 10)
    document.querySelector(".currentVerb").innerHTML = verbs[x].present
    return verbs[x]
}

function checkAnswer() {
    let currentVerb = verbGenerator()
    document.getElementById("check").addEventListener("click", () => {
        let present = document.getElementById("presentAns").value.toLowerCase()
        let past = document.getElementById("pastAns").value.toLowerCase()
        let participle = document.getElementById("participleAns").value.toLowerCase()

        if (present === currentVerb.present.toLowerCase() &&
            past === currentVerb.past.toLowerCase() &&
            participle === currentVerb.parti.toLowerCase()
        ){
            console.log('Correct!')
            currentVerb = verbGenerator()
        }else{
            console.log('Incorrect ):')
        }
    })
}

export {
    verbGenerator,
    checkAnswer,
}