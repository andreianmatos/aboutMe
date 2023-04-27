

var currentSection = "section1";


function show(hiddenSection) {
    if(currentSection!=hiddenSection){
        var hiddenElements = document.getElementsByClassName(hiddenSection);
        Array.prototype.forEach.call(hiddenElements, function(element, index) {
            element.style.display="block";
        });
        var shownElements = document.getElementsByClassName(currentSection);
        Array.prototype.forEach.call(shownElements, function(element, index) {
            element.style.display="none";       
        });   
        currentSection = hiddenSection;
    }
}

function rotateName(orient) {
    if(orient == "up")
        document.getElementById("name").style.webkitTransform = "rotate(0deg)";
    else if(orient == "down")
        document.getElementById("name").style.webkitTransform = "rotate(-180deg)";
}