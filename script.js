const root = document.getElementById("root");
const samples = document.getElementsByClassName("sample");
/*generateRandomColor(): generate a single hex code using a random value between 0 and 16777215*/
function generateRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    while(randomColor.length < 6){
        randomColor = randomColor + "0";
    }
    return randomColor;
}
function generateColorScale(colorCode, size = 5){
    console.log(size)
    let scale = [];
    let currColorOnScale;
    let colorToAdd;
    colorCode = parseInt(colorCode, 16);
    while(scale.length < size){
        if(scale.length == 0){
            scale.push("FFFFFF");
        }else if(scale.length < Math.floor(size/2)){
            scale.push(Math.floor((parseInt(currColorOnScale, 16) + colorCode)/2).toString(16).toUpperCase().substring(0, 6));
        }else if(scale.length == Math.round(size/2)){
            scale.push(colorCode.toString(16).toUpperCase().substring(0, 6));
        }else{
            colorToAdd = Math.floor((parseInt(currColorOnScale, 16) + parseInt("000000", 16))/2).toString(16).toUpperCase().substring(0, 6)
            while(colorToAdd.length < 6){
                colorToAdd = "0" + colorToAdd;
            }
            scale.push(colorToAdd);
        }
        console.log(scale);
        currColorOnScale = scale[scale.length - 1];
    }
    return scale;
}
function generateTextColor(color){
    for (let i = 0; i < color.length; i++) {
        if(i%2 == 0 && color[i] < '5'){
            console.log(color + " " + color[i])
            return 'FFFFFF';
        }
    }
    console.log("black");
    return '000000';
}

function generateColors(numberOfsamples = 5){
    let colors = [];
    //colors = generateColorScale(generateRandomColor());
    /*First we add random colors to the pallette*/

    for (let i = 0; i < numberOfsamples; i++) {
        colors.push(generateRandomColor());
    }

    /*We order them from low to hight or reverse at random*/
    (Math.random < 0.5)?colors.sort():colors.sort().reverse();
    /*The resulting pallete is shown in the web*/
    for (let i = 0; i < numberOfsamples; i++) {
        const sample = document.getElementById(`color-${i+1}`);
        sample.style = `background-color:#${colors[i]}; color: #${generateTextColor(colors[i])};`;
        sample.textContent = colors[i];
    }
}    
function addColorScale(scale){
    let hueSamples = document.createDocumentFragment();
    for (let i = 0; i < scale.length; i++) {
        const sample = document.createElement("div");
        sample.style = `background-color:#${scale[i]}; color: #${generateTextColor(scale[i])};`;
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
    samples[i].addEventListener("mouseover", () =>{
        if(samples[i].childNodes.length < 30){
            samples[i].append(addColorScale(generateColorScale(samples[i].textContent, 30)));
        }        
    });
}