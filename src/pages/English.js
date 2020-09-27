const English = async () => {
    const view = `
        <div class="verb-test">
            <div class="verb-test__verb">
                <p class="currentVerb"></p>
            </div>
            <div class="verb-test__inputwrapper">
                <input
                    type="text"
                    id="presentAns"
                    placeholder="Present"
                    required
                >
                <input
                    type="text"
                    id="pastAns"
                    placeholder="Past"
                    required
                >
                <input
                    type="text"
                    id="participleAns"
                    placeholder="Participle"
                >
            </div>
            <div class="verb-test__answermsg">
                <p class="answer-status"><span id="main-word"></span></p>
            </div>
            <div class="verb-test_button">
                <input type="button" id="check" value="Check">
            </div>
        </div>
    `;
    return view
}

export default English