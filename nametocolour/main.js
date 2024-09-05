let fName = document.getElementById("fName");
let mName = document.getElementById("mName");
let sName = document.getElementById("sName");

function displayColour(colour) {
  document.body.style.background = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
}

function strip(str) {
  return str.replace(/[^a-z]/gi, '').toLowerCase();
}

function generateColour() {
  let name = [strip(fName.value), strip(mName.value), strip(sName.value)];

  let colour = [0, 0, 0];

  for (let i = 0; i < name.length; i++) {
    for (let j = 0; j < name[i].length; j++) {
      colour[i] += (name[i].charCodeAt(j) - 96);
    }
    colour[i] = (colour[i] * 4) % 256;
  }

  displayColour(colour);
}
