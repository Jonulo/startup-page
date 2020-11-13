const ToDo = () => {
  const view = `
    <h2 class="note-title">Make a Note!</h2>
    <form id="notes-form" class="notes-form" onsumbit="return false;">
      <textarea 
      id="note-content"
      class="notes-form__content"
      placeholder="Write your note here"
      cols="30"
      rows="8"
      ></textarea>
      <input type="date" id="noteDate" class="notes-form__date" name="noteDate">
      <select id="noteColor" name="noteColor" class="notes-form__notecolor">
        <option value="#ffffff" style="background-color: #ffffff;"></option>
        <option value="#00ffe1" style="background-color: #00ffe1;"></option>
        <option value="#ff00d4" style="background-color: #ff00d4;"></option>
        <option value="#eeff00" style="background-color: #eeff00;"></option>
        <option value="#2bff00" style="background-color: #2bff00;"></option>
        <option value="#ff4000" style="background-color: #ff4000;"></option>
      </select>
      <!--<input type="color" id="noteColor" name="noteColor" class="notes-form__notecolor" value="#ff0000">-->
      <input type="submit" class="notes-form__button" value="Add Note">
    </form>

    <hr class="note-separator">
    
    <section class="notes-wrapper" id="notesWrapper"></section>
  ` 
  return view
}

export default ToDo
