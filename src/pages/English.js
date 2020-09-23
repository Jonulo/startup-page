const English = async () => {
    const view = `
        <div class="verb-test">
            <p class="currentVerb"></p>
            <input type="text" id="presentAns">
            <input type="text" id="pastAns">
            <input type="text" id="participleAns">
            <input type="button" id="check" value="check">
        </div>
    `;
    return view
}

export default English