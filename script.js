/*-----------------------------------------------------------------------------------------------------------------------------------------*/

import { generateRandomColor, generateColorScale } from "./controller/colorGenerating.js";

/*-----------------------------------------------------------------------------------------------------------------------------------------*/

const root = document.getElementById("root");
const samples = document.getElementsByClassName("sample");

/*-----------------------------------------------------------------------------------------------------------------------------------------*/

function chooseTextColor(color) {
    for (let i = 0; i < color.length; i++) {
        if (i % 2 == 0 && color[i] < '5') {
            return 'FFFFFF';
        }
    }
    return '000000';
}
function updateSample(sample, color){
    sample.style = `background-color:#${color}; color: #${chooseTextColor(color)};`;
    sample.textContent = color;
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
        updateSample(sample, colors[i]);
    }
}
/*generateColorSacaleElements(scale): returs a NodeList of div elements based on a given HEX Color list*/
function generateColorSacaleElements(scale) {
    let hueSamples = document.createDocumentFragment();
    for (let i = 0; i < scale.length; i++) {
        const sample = document.createElement("div");
        sample.style = `background-color:#${scale[i]}; color: #${chooseTextColor(scale[i])}; height: ${Math.floor(100 / scale.length)}vh;`;
        sample.textContent = scale[i];
        sample.classList.add("hue-sample");
        hueSamples.appendChild(sample);
    }
    hueSamples.childNodes[Math.round(hueSamples.childNodes.length/2)].classList.add("selected");
    return hueSamples;
}
function scrollThroughScale(event, scale){
    if(event.deltaY < 0){
        scale = scale.push(scale.shift());
    }else{
        scale = scale.unshift(scale.pop());
    }
}
/*-----------------------------------------------------------------------------------------------------------------------------------------*/
/*onload executions and EventListeners*/

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
        const colorScale = generateColorScale(samples[i].textContent, 10);
        
        samples[i].addEventListener("wheel", (event) => {
            samples[i].textContent = "";
            scrollThroughScale(event, colorScale);
            samples[i].append(generateColorSacaleElements(colorScale));
        }, { passive: true });
        samples[i].addEventListener("mouseleave", () => {
            if (samples[i].childNodes.length > 1) {
                samples[i].innerHTML = samples[i].childNodes[Math.floor(samples[i].childNodes.length / 2)].textContent;
            }
            updateSample(samples[i], colorScale[Math.round(colorScale.length/2)])
        })
    }, { once: true });
}