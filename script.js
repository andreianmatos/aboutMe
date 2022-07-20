
var xCoord;
var yCoord;

function show(shown, hidden) {
  document.getElementById(shown).style.display="block";
  document.getElementById(hidden).style.display="none";
}

function rotateName(orient) {
    if(orient == "up")
        document.getElementById("name").style.webkitTransform = "rotate(0deg)";
    else if(orient == "down")
        document.getElementById("name").style.webkitTransform = "rotate(-180deg)";
}

setInterval(function changeFontSize() {
    var previousGrad =  document.body.style.background.substring(44,47);
    console.log(previousGrad);
    previousGrad.replace("%)","");
    console.log(previousGrad);
    document.body.style.background = "linear-gradient(to top, whitesmoke 0%, gray " +  parseInt(previousGrad) + parseInt(yCoord) + "%)";
}, 1);

function coordinate(event) {
    xCoord = event.clientX;
    yCoord = event.clientY;
 }