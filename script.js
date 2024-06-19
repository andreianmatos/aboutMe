

var currentSection = "";
var currentSubSection = "";

function show(hiddenSection) {
    if((currentSection + ' ' + currentSubSection) != hiddenSection){

        if(currentSection != ""){
            var shownElements = document.getElementsByClassName(currentSection + ' ' + currentSubSection);
            Array.prototype.forEach.call(shownElements, function(element, index) {
                element.style.display="none";
                element_menu = "menu_" + currentSection;
                document.getElementById(element_menu).style.color="whitesmoke";  
                if(currentSubSection != ""){
                    var submenu = "submenu " + currentSection;
                    submenuElements = document.getElementsByClassName(submenu);
                    Array.prototype.forEach.call(submenuElements, function(element, index) {
                        element.style.display="none";
                    }); 
                    element_submenu = element_menu + '_' + currentSubSection;
                    document.getElementById(element_submenu).style.color="whitesmoke"; 
                }
            });  
        }   

        currentSection = hiddenSection.split(/\s+/)[0];
        if (/\s/.test(hiddenSection)) {
            currentSubSection = hiddenSection.split(/\s+/)[1];        
        }
        else{
            currentSubSection = ""
        }
        
        var hiddenElements = document.getElementsByClassName(hiddenSection);
        Array.prototype.forEach.call(hiddenElements, function(element, index) {
            element.style.display="block";
            element_menu = "menu_" + currentSection;
            document.getElementById(element_menu).style.color="gray"; 
            console.log(currentSubSection)
            if(currentSubSection != ""){
                var submenu = "submenu " + currentSection;
                submenuElements = document.getElementsByClassName(submenu);
                Array.prototype.forEach.call(submenuElements, function(element, index) {
                    element.style.display="block";
                }); 
                element_submenu = element_menu + '_' + currentSubSection;
                document.getElementById(element_submenu).style.color="gray"; 
            }
        });  

    }
}

function rotateName(orient) {
    if(orient == "up")
        document.getElementById("name").style.webkitTransform = "rotate(0deg)";
    else if(orient == "down")
        document.getElementById("name").style.webkitTransform = "rotate(-180deg)";
}

function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.collapsible').forEach(item => {
      let content = item.nextElementSibling;
      let arrow = item.querySelector('.arrow');
  
      item.addEventListener('click', function() {
        if (content.style.display === 'block') {
          content.style.display = 'none';
          arrow.classList.remove('arrow-down');
          arrow.classList.add('arrow-up');
        } else {
          content.style.display = 'block';
          arrow.classList.remove('arrow-up');
          arrow.classList.add('arrow-down');
        }
      });
    });
  });
  