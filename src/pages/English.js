const English = async () => {
    const view = `
        <div class="verb-test">
            <div class="verb-test__verb">
                <p class="currentVerb"></p>
            </div>
            <div class="verb-test__inputwrapper">
                <input
                    type="text"
                    id="pastAns"
                    placeholder="Past"
                    class="englishInputsText"
                    disabled
                    autocomplete="off"
                >
                <input
                    type="text"
                    id="participleAns"
                    placeholder="Participle"
                    class="englishInputsText"
                    disabled
                    autocomplete="off"
                >
                <input
                    type="text"
                    id="spanishAns"
                    placeholder="Spanish"
                    class="englishInputsText"
                    disabled
                    autocomplete="off"
                >
            </div>
            <div class="verb-test__answermsg">
                <p class="answer-status"><span id="main-word"></span></p>
            </div>
            <div class="verb-test__btn">
                <input type="button" id="check" class="btn--check" value="Check" disabled>
                <input type="button" id="skipVerb" class="btn--skip" value="Skip" disabled>
            </div>
            <div class="verb-test__start">
                <input type="button" id="startTest" class="btn--start" value="START">
            </div>
            <div class="verb-test__answerCounter">
                <p class="countdown" id="countdown">00:00</p>
                <p class="timer-info">
                    Correct: <span class="timer-info__counter" id="correctCounter">0</span>
                    Attempts: <span class="timer-info__counter" id="attemptsCounter">0</span>
                    Skipped: <span class="timer-info__counter" id="skippedCounter">0</span>
                </p>
            </div>
        </div>
        <div class="results-test">
            <div class="results-test__header">
                <h3>Your best result:</h3>
                <p id="dataTest-wrapper">
                    Date:<span></span>
                    Correct:<span></span>
                    Attempts:<span></span>
                    Skipped:<span></span>
                </p>
            </div>
        </div>
        <div class="table-section">
          <div class="table-section__button">
            <button id="tableBtn">Show Verbs Table</button>
          </div>
          <div id="modalTable" class="table-section__modal">
            <div class="modal-content">
              <span id="closeBtn" class="modal-content__close">&times;</span>
              <input type="text" id="searchVerb" class="modal-content__input" placeholder="Search for verbs" title="Type a verb" autocomplete="off">
              <table id="verbsTable" class="modal-content__table">
              </table>
            </div>
          </div>
        </div>
    `;
    return view
}

export default English
