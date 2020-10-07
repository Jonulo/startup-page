const storageAvailable = () => (typeof(localStorage) !== 'undefined') ? true : false

function setData(data="") {
    if(storageAvailable) {
        let currentData = JSON.parse(localStorage.getItem("dataTest")) || ""
        let wrapperElement = document.getElementById("dataTest-wrapper").children
        if(data){
            if(!currentData){
                localStorage.setItem("dataTest", JSON.stringify(data))
                showData(data, wrapperElement)
            }else if(data.correctAnswers > currentData.correctAnswers){
                localStorage.setItem("dataTest", JSON.stringify(data))
                showData(data, wrapperElement)
            }
        }else {
            showData(currentData, wrapperElement)
        }
    }else {
        alert('Your browser doesnt allow localStorage functions... Please use another browser')
    }
}

function showData(data, domElements) {
    Object.values(data).forEach((val, x) => {
        domElements[x].innerHTML = val
    })
}

export {
    setData,
}