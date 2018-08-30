(function(){

    //HAMBURGER RESPONSIVE MENU
    /*
    $(".hamburger-menu").click(function(e)
    {
        e.preventDefault();
        $(".hamburger-menu-icon").toggleClass("is-open");
        $(".menu").toggleClass("menu-show");
    });
    */

    var toggleClass = function(el, classname) {
        if(el.classList) {
            el.classList.toggle(classname);
        } else {
            //IE 9
            var classes = menu.className.split(" ");
            var index =  classes.indexOf(classname);
            if(index >= 0) {
                classes.splice(index, 1);
            } else {
                classes.push(classname);
                el.className = classes.join(" ");
            }
        }
    };

    var toggleMenu = function() {
        toggleClass(document.querySelector(".menu"), "menu-show");
        toggleClass(document.querySelector(".hamburger-menu-icon"), "is-open");
    }

    document.querySelector(".hamburger-menu").onclick = function(e) {
        e.preventDefault();
        toggleMenu();
    };

    [].slice.call(document.querySelectorAll(".menu > li a")).map(function(item){
        item.onclick = function(e){
            toggleMenu();
        }
    })
    

})();