import {generateRandomColor, generateColorScale} from "./controller/colorGenerating.js";

const root = document.getElementById("root");
const samples = document.getElementsByClassName("sample");
/*generateRandomColor(): generate a single hex code using a random value between 0 and 16777215*/

function chooseTextColor(color) {
    for (let i = 0; i < color.length; i++) {
        if (i % 2 == 0 && color[i] < '5') {
            return 'FFFFFF';
        }
    }
    return '000000';
}

function addSamples(numberOfsamples = 5) {
    let colors = [];
    /*First we add random colors to the pallette*/
    for (let i = 0; i < numberOfsamples; i++) {
        colors.push(generateRandomColor());
    }
    /*We order them from low to hight or reverse at random*/
    (Math.random < 0.5) ? colors.sort() : colors.sort().reverse();
    /*The resulting pallete is shown in the web*/
    for (let i = 0; i < numberOfsamples; i++) {
        const sample = document.getElementById(`color-${i + 1}`);
        sample.style = `background-color:#${colors[i]}; color: #${chooseTextColor(colors[i])};`;
        sample.textContent = colors[i];
    }
}
function addColorScale(scale) {
    let hueSamples = document.createDocumentFragment();
    for (let i = 0; i < scale.length; i++) {
        const sample = document.createElement("div");
        sample.style = `background-color:#${scale[i]}; color: #${chooseTextColor(scale[i])}; height: ${Math.floor(100 / scale.length)}vh;`;
        sample.textContent = scale[i];
        sample.classList.add("hue-sample");
        hueSamples.appendChild(sample);
    }
    return hueSamples;
}
root.onload = addSamples();

document.getElementById("addSamplesButton").addEventListener("click", () => {
    addSamples();
})
/*keyboard contols*/
document.addEventListener("keypress", (event) => {
    if (event.key == " " || event.key == "Enter") {
        addSamples();
    }
});

for (let i = 0; i < samples.length; i++) {
    samples[i].addEventListener("mouseenter", () => {
        samples[i].addEventListener("wheel", () =>{
            if (samples[i].childNodes.length < 10) {
                const temp = samples[i].textContent;
                samples[i].textContent = "";
                samples[i].append(addColorScale(generateColorScale(temp, 10)));
            }
        }, {passive: true});
        samples[i].addEventListener("mouseleave", () => {
            if (samples[i].childNodes.length > 1) {
                samples[i].innerHTML = samples[i].childNodes[Math.floor(samples[i].childNodes.length/2)].textContent;
            }
        })
    }, {once : true});
}