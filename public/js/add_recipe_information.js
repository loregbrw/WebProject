const add_input = document.getElementById("add_input_button");
const add_textarea = document.getElementById("add_textarea_button");
const change_view_setting = document.getElementById("post_view_setting")

let post_view_current = 1;

add_input.addEventListener("click", function(){
    var ingredients = document.getElementById("ingredients");

    const new_div = document.createElement("div");
    const new_number = document.createElement("input");
    const new_input = document.createElement("input");
    new_input.placeholder = "Ingrediente";
    new_input.setAttribute('class', "width-70");
    new_number.type = "number";
    new_number.min = 1;
    new_number.placeholder = "1";
    new_number.setAttribute('class', "width-50px");
    new_div.setAttribute('class', "flex-row gap-20");

    ingredients.appendChild(new_div);
    new_div.appendChild(new_number);
    new_div.appendChild(new_input);
});

add_textarea.addEventListener("click", function(){
    var steps = document.getElementById("steps");

    const new_div = document.createElement("div");
    const new_number = document.createElement("input");
    const new_textarea = document.createElement("textarea");
    new_textarea.placeholder = "Passo";
    new_number.type = "number";
    new_number.min = 1;
    new_number.placeholder = "1";
    new_number.setAttribute('class', "width-50px");
    new_div.setAttribute('class', "flex-row gap-20");

    steps.appendChild(new_div);
    new_div.appendChild(new_number);
    new_div.appendChild(new_textarea);
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