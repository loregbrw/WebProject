const dark_mode = document.getElementById("dark_mode_icon");
const html = document.querySelector("html");

let dark_mode_on = localStorage.getItem("dark_mode_item");
if (dark_mode_on === null) {

    dark_mode_on = "0";
}

if (dark_mode_on === "1") {
    html.classList.add("dark-mode");
}

dark_mode.addEventListener("click", function () {
    dark_mode.setAttribute('src', `/img/icon-dark-mode-${dark_mode_on}.png`);
    if (dark_mode_on === "0") {
    
        dark_mode_on = "1";
        localStorage.setItem("dark_mode_item", "1");
        html.classList.add("dark-mode");
    } 
    else {
        dark_mode_on = "0";
        localStorage.setItem("dark_mode_item", "0");
        html.classList.remove("dark-mode");
    }
});