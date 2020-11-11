const ToDo = () => {
  const view = `
    <h1>This is ToDo page!</h1>
    <form id="notes-form" class="notes-form" onsumbit="return false;">
      <input id="note-content" class="notes-form__content" type="text" autocomplete="off" placeholder="write your note here">
      <label for="noteDate">Dead Line:</label>
      <input type="date" id="noteDate" class="notes-form__date" name="noteDate">
      <label for="noteColor">Note color:</label>
      <input type="color" id="noteColor" name="noteColor" class="notes-form__notecolor" value="#ff0000">
      <input type="submit" class="notes-form__button" value="Add Note">
    </form>
    <section class="notes-wrapper" id="notesWrapper"></section>
  ` 
  return view
}

export default ToDo
