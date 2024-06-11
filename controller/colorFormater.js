/*List<Number> [3] toRgb: return a list of three numbers that reperesents the color in rgb of the Hex value given*/
export function toRgb(hexColor){
    let rgbColor = []
    while(hexColor.length < 6){
        hexColor = "0" + hexColor;
    }
    hexColor = hexColor.match(/..?/g);
    for (let i = 0; i < hexColor.length; i++) {
        rgbColor.push(parseInt(hexColor[i], 16));
    }
    return rgbColor;
}
export function toRgbString(color){
    if(typeof(color) == "string"){
        color = toRgb(color);
    }
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}
/*String toHex(List<>): Returns the Hex string based on the rgbColor given*/
export function toHex(rgbColor){
    let hexColor = ""
    /*rgbColor must be a list*/
    for(let i = 0; i < rgbColor.length; i++){
        rgbColor[i] = rgbColor[i].toString(16);
        hexColor += (rgbColor[i].length < 2)?"0"+rgbColor[i]:rgbColor[i];
    }
    return hexColor;
}