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

function addNote() {
  let noteStoraged = JSON.parse(localStorage.getItem("notes")) || ""
  let noteContent = document.getElementById("note-content")
  let noteColorElement = document.getElementById("noteColor")
  let noteDateElement = document.getElementById("noteDate")

  let noteCounter = 0
  let noteColor = "white"
  let noteDate = "-- --"

  if(noteStoraged) {
    noteCounter = Math.max.apply(Math, noteStoraged.map(note => {return note.id})) 
    noteColor = noteColorElement.value 
    noteDate = noteDateElement.value || "-- --"
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
    noteDate = noteDateElement.value || "-- --" 
    let newNote = {
      id: ++noteCounter,
      content: noteContent.value,
      date: noteDate, 
      color: noteColor 
    }
    arrayNotes.push(newNote)  
    localStorage.setItem("notes", JSON.stringify(arrayNotes))
  }
  showNotes()
}

function newNote() {
  const submitNote = document.getElementById('notes-form')

  showNotes()
  submitNote.addEventListener("submit", async (e) => {
    e.preventDefault()
    await addNote()
  })
}

export {
  newNote
}
