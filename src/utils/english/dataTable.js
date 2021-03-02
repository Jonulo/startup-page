import verbs from './verbsList'

function showTable() {
    const tableBtn = document.getElementById("tableBtn")
    const modalTable = document.getElementById("modalTable")
    const closeTable = document.getElementById("closeBtn")
    const searchInput = document.getElementById("searchVerb")

    const verbsTable = document.getElementById("verbsTable")

  tableBtn.addEventListener("click", () => {
    modalTable.style.display = "block"
    fillTable()
  })
  closeBtn.addEventListener("click", () => {
    modalTable.style.display = "none"
  })
  window.addEventListener("click", () => {
    searchInput.value = ""
    if(event.target == modalTable)
      modalTable.style.display = "none";
  })
  searchInput.addEventListener("keyup", () => {
    let filter = searchInput.value.toUpperCase() 
    let tr = verbsTable.getElementsByTagName("tr")
    let td, textValue

    for(let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0]
      if(td) {
        textValue = td.textContent || td.innerText 
        if(textValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = ""
        } else {
          tr[i].style.display = "none"
        }
      }
    }
  })
}

function fillTable() {
  const verbsTable = document.getElementById("verbsTable")
  let failedVerbs = JSON.parse(localStorage.getItem("failedVerbs")) || {}
  let output = `
    <tr>
      <th>Present</th>
      <th>Past</th>
      <th>Participle</th>
      <th>Spanish</th>
    </tr>
  `
  verbs.forEach((verb, i) => {
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
  verbsTable.innerHTML = output
}

export {
  showTable
}
