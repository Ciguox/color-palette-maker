/*-----------------------------------------------------------------------------------------------------------------------------------------*/

import { generateRandomColor, generateColorScale } from "./controller/colorGenerating.js";

/*-----------------------------------------------------------------------------------------------------------------------------------------*/

const root = document.getElementById("root");

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
function chooseTextColor(color) {
    for (let i = 0; i < color.length; i++) {
        if (i % 2 == 0 && color[i] < '5') {
            return 'FFFFFF';
        }
    }
    return '000000';
}
/*updateDample: Updates the bg-color and text in a div passed*/
function updateSample(sample, color){
    sample.style = `background-color:#${color}; color: #${chooseTextColor(color)};`;
    sample.textContent = color;
}
function addMouseEventToColorSamples(sample){
    sample.addEventListener("mouseenter", () => {
        const colorScale = generateColorScale(sample.textContent, 10);
        sample.addEventListener("wheel", (event) => {
            sample.textContent = "";
            scrollThroughScale(event, colorScale);
            sample.append(generateColorScaleElements(colorScale));
        }, { passive: true });
        sample.addEventListener("mouseleave", () => {
            if (sample.childNodes.length > 1) {
                sample.innerHTML = sample.childNodes[Math.floor(sample.childNodes.length / 2)].textContent;
                updateSample(sample, colorScale[Math.round(colorScale.length/2)])
            }
        })
    }, { once: true });
}
function generateSampleElements(numberOfsamples = 5) {
    let colors = [];
    root.innerHTML = "";
    /*First we add random colors to the pallette*/
    for (let i = 0; i < numberOfsamples; i++) {
        colors.push(generateRandomColor());
    }
    /*We order them from low to hight or reverse at random to improve presentability*/
    (Math.random < 0.5) ? colors.sort() : colors.sort().reverse();
    /*The resulting pallete is shown in the web*/
    for (let i = 0; i < numberOfsamples; i++) {
        /*We create the "sample" div element*/
        const sample = document.createElement("div");
        sample.id = `color-${i}`;
        sample.classList.add("sample")
        sample.title = "scroll with the mouse wheel to change brightness";
        updateSample(sample, colors[i]);
        addMouseEventToColorSamples(sample);
        root.appendChild(sample);
    }
}

/*generateColorScaleElements(scale): returs a NodeList of div elements based on a given HEX Color list*/
function generateColorScaleElements(scale) {
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

root.onload = generateSampleElements();

document.getElementById("generateSampleElementsButton").addEventListener("click", () => {
    generateSampleElements();
})
/*keyboard contols*/
document.addEventListener("keypress", (event) => {
    if (event.key == " " || event.key == "Enter") {
        generateSampleElements();
    }
});
