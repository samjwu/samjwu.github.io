//Slideshow - auto change image
var slideindex = 0;
var waittime = 1000; //in milliseconds
slideshow();

function slideshow() {
    var i;
    var x = document.getElementsByClassName("slide");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideindex++;
    if (slideindex > x.length) {slideindex = 1}
    x[slideindex-1].style.display = "block";
    setTimeout(slideshow, waittime);
}