const root = document.getElementById("root");

/*generateRandomColor(): generate a single hex code using a random value between 0 and 16777215*/
function generateRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
    while(randomColor.length < 6){
        randomColor = randomColor + "0";
    }
    return randomColor;
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

    /*First we add random colors to the pallette*/
    for (let i = 0; i < numberOfsamples; i++) {
        colors.push(generateRandomColor());
    }
    /*We order them from low to hight or reverse at random*/
    (Math.random < 0.5)?colors.sort():colors.sort().reverse();
    /*The resulting pallete is shown in the web*/
    for (let i = 0; i < numberOfsamples; i++) {
        document.getElementById(`color-${i+1}`).style = `background-color:#${colors[i]};`;
        const text = document.getElementById(`color-${i+1}-hex`);
        text.innerText = colors[i];
        text.style = `color: #${generateTextColor(colors[i])};`
    }
}    
    
root.onload = generateColors();
/*keyboard contols*/    
document.addEventListener("keypress", (event) => {
    if (event.key == " " || event.key == "Enter") {
        generateColors();
    }
});