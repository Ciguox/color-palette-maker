const root = document.getElementById("root");
const samples = document.getElementsByClassName("sample");
/*generateRandomColor(): generate a single hex code using a random value between 0 and 16777215*/
function generateRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    while (randomColor.length < 6) {
        randomColor = randomColor + "0";
    }
    return randomColor;
}
function generateColorScale(colorCode, size = 5) {
    /*Variables*/
    let scale = [];
    let colorToAdd, whiteStep = [], blackStep = [];
    /*we create 3 lists with the RGB values of color code 000 and fff*/
    let white = [255, 255, 255], black = [0, 0, 0], colorCodeCopy = colorCode.valueOf();
    colorCode = colorCode.match(/..?/g);
    /*executions*/
    /*Calculate the color step*/
    for (let i = 0; i < colorCode.length; i++) {
        whiteStep.push(Math.abs(Math.floor((parseInt(colorCode[i], 16)-white[i])/(size/2))));
        blackStep.push(Math.abs(Math.floor((parseInt(colorCode[i], 16)-black[i])/(size/2))));
    }
    /*Calculate each color on the scale based on the step*/
    while (scale.length < size) {
        if (scale.length < Math.floor(size / 2)) {
            for (let i = 0; i < colorCode.length; i++) {
                colorCode[i] = white[i] -  whiteStep[i];
                white[i] = colorCode[i];
                //DEC to HEX
                colorCode[i] = colorCode[i].toString(16);
            }
            colorToAdd = colorCode.join("").toUpperCase().substring(0, 6);
        } else if (scale.length == Math.floor(size / 2)) {
            colorCode = colorCodeCopy.match(/..?/g);
            colorToAdd = colorCodeCopy;
        } else {
            for (let i = 0; i < colorCode.length; i++) {
                colorCode[i] = parseInt(colorCode[i], 16) -  blackStep[i];
                colorCode[i] = (colorCode[i]<0)?0:colorCode[i];
                //DEC to HEX
                colorCode[i] = colorCode[i].toString(16);
                colorCode[i] = (colorCode[i].length == 1)?"0"+colorCode[i]:colorCode[i];
            }
            colorToAdd = colorCode.join("").toUpperCase().substring(0, 6);
        }
        scale.push(colorToAdd);
    }
    return scale;
}
function generateTextColor(color) {
    for (let i = 0; i < color.length; i++) {
        if (i % 2 == 0 && color[i] < '5') {
            return 'FFFFFF';
        }
    }
    return '000000';
}

function generateColors(numberOfsamples = 5) {
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
        sample.style = `background-color:#${colors[i]}; color: #${generateTextColor(colors[i])};`;
        sample.textContent = colors[i];
    }
}
function addColorScale(scale) {
    let hueSamples = document.createDocumentFragment();
    for (let i = 0; i < scale.length; i++) {
        const sample = document.createElement("div");
        console.log(100 / scale.length);
        sample.style = `background-color:#${scale[i]}; color: #${generateTextColor(scale[i])}; height: ${Math.floor(100 / scale.length)}vh;`;
        sample.textContent = scale[i];
        sample.classList.add("hue-sample");
        hueSamples.appendChild(sample);
    }
    return hueSamples;
}
root.onload = generateColors();
/*keyboard contols*/
document.addEventListener("keypress", (event) => {
    if (event.key == " " || event.key == "Enter") {
        generateColors();
    }
});

for (let i = 0; i < samples.length; i++) {
    samples[i].addEventListener("mouseenter", () => {
        console.log("Event added");
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