import {toRgb, toHex} from "./colorFormater.js"
/*Generates a random HEX color*/
function formatColor(color){
    while (color.length < 6) {
        color = "0" + color;
    }
    return color
}
export function generateRandomColor() {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16).toUpperCase();

    randomColor = formatColor(randomColor);
    return randomColor;
}

/*generateColorScale(colorCode, size = 5): Generates a list of HEX colors from white to black based on a given color and size of list*/
export function generateColorScale(colorCode, size = 5) {
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
