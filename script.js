// before 

function start() {
    if (sessionStorage.length != 0) {
        document.getElementById("topnavbar").style.visibility = sessionStorage.getItem('topbarvisibility');
        if(sessionStorage.getItem('topbarvisibility') == "visible") 
            document.getElementById("menuicon").classList.toggle("change");
    }
}   

// other functions 

function displayMenu(x) {
     x.classList.toggle("change");
    if(document.getElementById("topnavbar").style.visibility == "hidden") {
        document.getElementById("topnavbar").style.visibility = "visible";
        sessionStorage.setItem('topbarvisibility', "visible");
    }
    else{
        document.getElementById("topnavbar").style.visibility = "hidden";
        sessionStorage.setItem('topbarvisibility', "hidden");
    }
}

function show(shown, hidden) {
  document.getElementById(shown).style.display="block";
  document.getElementById(hidden).style.display="none";
}
