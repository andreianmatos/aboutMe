

var currentSection = "";


function show(hiddenSection) {
    if(currentSection != hiddenSection){
        var hiddenElements = document.getElementsByClassName(hiddenSection);
        Array.prototype.forEach.call(hiddenElements, function(element, index) {
            element.style.display="block";
            element_menu = "menu_" + hiddenSection;
            document.getElementById(element_menu).style.color="gray";            
        });
        var shownElements = document.getElementsByClassName(currentSection);
        Array.prototype.forEach.call(shownElements, function(element, index) {
            element.style.display="none"; 
            element_menu = "menu_" + element.getAttribute("class");~
            console.log(element_menu)
            document.getElementById(element_menu).style.color="whitesmoke";             
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