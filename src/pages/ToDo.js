const ToDo = () => {
  const view = `
    <h1>This is ToDo page!</h1>
    <form id="notes-form" onsumbit="return false;">
      <input id="note-content" type="text" placeholder="write your note here">
      <input type="submit" value="add">
    </form>
    <section class="notes-wrapper" id="notesWrapper"></section>
  ` 
  return view
}

export default ToDo
