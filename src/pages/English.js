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
                >
                <input
                    type="text"
                    id="participleAns"
                    placeholder="Participle"
                >
                <input
                    type="text"
                    id="spanishAns"
                    placeholder="Spanish"
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
            <p id="results"></p>
        </div>
    `;
    return view
}

export default English
