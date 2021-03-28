// ----------------- FIRST PAGE --------------------

const $title = document.getElementById("title")
const $main = document.getElementById("main")

let currentStory

function clickStoryOption(event) {
    const $button = event.target;
    const index = $button.dataset.index;
    console.log(stories[index]);
    currentStory = stories[index];
    showStoryForm();
}

function addStoryOption(title, index) {
    const $button = document.createElement("button")
    $button.innerHTML = title;
    $main.appendChild($button)
    $button.dataset.index = index
    $button.addEventListener("click", clickStoryOption)
}

function pickStoryOption() {
    $main.innerHTML = "";
    $title.innerHTML = "Choose a story"
    let i = 0;
    for (story of stories) {
        addStoryOption(story.title, i);
        i++;
    }
}

pickStoryOption();


// ------------ SECOND PAGE --------------
function clickReadStory(event) {
    const $inputs = $main.getElementsByTagName("input")

    let words = {};
    for ($input of $inputs) {
        words[$input.name] = $input.value;
    }

    showStoryOutput(words);
}

function addReadStoryButton() {
    const $button = document.createElement("button")
    $button.innerHTML = "Read Story";
    $main.appendChild($button)
    $button.addEventListener("click", clickReadStory)

}

function makeWordHTML(word) {
    const input = `<input type="text" name="${word}" placeholder="${word}">`;
    return input;
}

function showStoryForm() {
    $main.innerHTML = "";
    $title.innerHTML = "Provide the following words:"

    let formHTML = "";
    for (word of currentStory.words) {
        formHTML += makeWordHTML(word);
    }

    $main.innerHTML = formHTML;
    addReadStoryButton();
}


//---------------- THIRD PAGE --------------------
function clickAnotherStory() {
    pickStoryOption();
}

function addAnotherStoryButton() {
    const $button = document.createElement("button")
    $button.innerHTML = "Create Another Story";
    $main.appendChild($button)
    $button.addEventListener("click", clickAnotherStory)
}

function showStoryOutput(words) {
    let outputHTML = currentStory.output(words);
    $main.innerHTML = outputHTML;
    $title.innerHTML = currentStory.title;
    addAnotherStoryButton();
}