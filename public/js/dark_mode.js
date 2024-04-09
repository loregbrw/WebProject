const dark_mode = document.getElementById("dark_mode_icon");
const html = document.querySelector("html");

let dark_mode_on = 0; 

dark_mode.addEventListener("click", function(){
    html.classList.toggle("dark-mode");

    if(dark_mode_on == 0){
        dark_mode_on = 1;
    }
    else{
        dark_mode_on = 0;
    }

    dark_mode = this.setAttribute('src', `/img/icon-dark-mode-${dark_mode_on}.png`);
    
    console.log("click");
});


