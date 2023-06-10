const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const title = document.getElementById("title");

let interval = null;
let elementTexts = {
    "title": "Thomas Wetherill".split(""),
};

function doHackerText(element) {
    let iteration = 0;
    clearInterval(interval);

    interval = setInterval(() => {
        element.innerText = element.innerText
        .split("")
        .map((letter, index) => {
            if (index < iteration) {
                return elementTexts[element.id][index];
            }
            return letters[Math.floor(Math.random() * 52)]
        })
        .join("");

        if (iteration >= element.innerText.length) {
            clearInterval(interval);
        }

        iteration += 1/3;
    }, 30);
}

window.onload = () => {
    doHackerText(title);
}