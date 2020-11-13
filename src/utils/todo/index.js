function showNotes(){
  let notes = JSON.parse(localStorage.getItem("notes")) || ""
  const notesWrapper = document.getElementById("notesWrapper")
  if(notes) {
    let output = ""
    notes.forEach(note => {
      output += `
        <div class="note" style="border: 2px solid ${note.color};">
          <div class="note__header">
            <span>${note.date}</span>
            <span  
            class="note-delete"  
            data-id="${note.id}"  
            title="Delete Note"
            >
              x
            </span>
          </div>
          <p class="note__content">${note.content}</p>
        </div>
      ` 
    })
    notesWrapper.innerHTML = output
    
    const allNotesIcon = document.getElementsByClassName("note-delete")
    for(const noteIcon of allNotesIcon) {
      noteIcon.addEventListener("click", () => {
        const noteStoraged = JSON.parse(localStorage.getItem("notes"))
        const deleteNoteId = parseInt(noteIcon.getAttribute("data-id"))

        if(noteStoraged.length === 1){
          localStorage.removeItem("notes")  
        }else {        
          notes = notes.filter(note => note.id !== deleteNoteId)
          localStorage.setItem("notes", JSON.stringify(notes))
        }
        
        showNotes()
      })
    }
  }else {
    notesWrapper.innerHTML = "There is no notes to show you" 
  }
}

function dateFormat(noteDate) {
  const dateMonth = parseInt(noteDate.slice(5, 7))
  const dateDay = noteDate.slice(8, 10)

  if(!noteDate)
    return "-- --"

  const monthsDict = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Aug',
    9: 'Sept',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  }
  
  let finalNoteDate = monthsDict[dateMonth]+" - "+dateDay
  return finalNoteDate
}

async function addNote() {
  let noteStoraged = JSON.parse(localStorage.getItem("notes")) || ""
  let noteContent = document.getElementById("note-content")
  let noteColorElement = document.getElementById("noteColor")
  let noteDateElement = document.getElementById("noteDate")

  let noteCounter = 0
  let noteColor = "white"

  if(!noteContent.value) {
    noteContent.style.border = '2px solid red'
    noteContent.focus() 
    return
  }
  if(noteStoraged) {
    noteCounter = Math.max.apply(Math, noteStoraged.map(note => {return note.id})) 
    noteColor = noteColorElement.value 
    let noteDateValue = noteDateElement.value 
    const noteDate = await dateFormat(noteDateValue)

    let newNote = {
      id: ++noteCounter,
      content: noteContent.value,
      date: noteDate, 
      color: noteColor 
    }
    noteStoraged.push(newNote)
    localStorage.setItem("notes", JSON.stringify(noteStoraged)) 
  }else {
    let arrayNotes = []
    noteColor = noteColorElement.value 
    let noteDateValue = noteDateElement.value 
    const noteDate = await dateFormat(noteDateValue)
    
    let newNote = {
      id: ++noteCounter,
      content: noteContent.value,
      date: noteDate, 
      color: noteColor 
    }
    arrayNotes.push(newNote)  
    localStorage.setItem("notes", JSON.stringify(arrayNotes))
  }
  noteContent.value = ""
  noteContent.style.border = "2px solid #ffffff"
  noteColorElement.style.background = "#ffffff"
  noteColorElement.value = "#ffffff"
  noteDateElement.value = ""
  showNotes()
}

function newNote() {
  const submitNote = document.getElementById("notes-form")
  const changeNoteColor = document.getElementById("noteColor")
  const noteContent = document.getElementById("note-content")

  noteContent.focus()
  showNotes()

  changeNoteColor.addEventListener("change", () => {
    const colorSelector = document.getElementById("noteColor")
    const colorPicked = changeNoteColor.value

    colorSelector.style.background = colorPicked
    noteContent.style.border = `2px solid ${colorPicked}`
  })

  submitNote.addEventListener("submit", async (e) => {
    e.preventDefault()
    await addNote()
  })
}

export {
  newNote
}
