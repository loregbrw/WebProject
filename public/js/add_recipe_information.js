const add_input = document.getElementById("add_input_button");
const add_textarea = document.getElementById("add_textarea_button");
const change_view_setting = document.getElementById("post_view_setting")

let post_view_current = 1;

add_input.addEventListener("click", function(){
    var ingredients = document.getElementById("ingredients");

    const new_input = document.createElement("input");
    new_input.type = "text";
    new_input.placeholder = "Ingrediente";

    ingredients.appendChild(new_input);
});

add_textarea.addEventListener("click", function(){
    var steps = document.getElementById("steps");

    const new_textarea = document.createElement("textarea");
    new_textarea.placeholder = "Passo";

    steps.appendChild(new_textarea);
});

change_view_setting.addEventListener("click", function(){
    this.setAttribute("src", `img/icon-post-view-${post_view_current}-bigger.png`);

    if(post_view_current == 3){
        post_view_current = 1;
    }
    else{
        post_view_current ++;
    }
});