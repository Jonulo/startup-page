import verbs from './verbsList'

function showTable() {
    const tableBtn = document.getElementById("tableBtn")
    const modalTable = document.getElementById("modalTable")
    const closeTable = document.getElementById("closeBtn")

  tableBtn.addEventListener("click", () => {
    modalTable.style.display = "block"
    fillTable()
  })
  closeBtn.addEventListener("click", () => {
    modalTable.style.display = "none"
  })
  window.addEventListener("click", () => {
    if(event.target == modalTable)
      modalTable.style.display = "none";
  })
}

function fillTable() {
  const verbsTable = document.getElementById("verbsTable")
  let output = `
    <tr>
      <th>Present</th>
      <th>Past</th>
      <th>Participle</th>
      <th>Spanish</th>
    </tr>
  `
  verbs.forEach(verb => {
    output += `
     <tr>
       <td>${verb.present}</td>
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
