const add_input = document.getElementById("add_input_button");
const add_textarea = document.getElementById("add_textarea_button");
const change_view_setting = document.getElementById("post_view_setting");
const add_items = document.getElementById("add_items");

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
    this.setAttribute("src", `/img/icon-post-view-${post_view_current}-bigger.png`);

    if(post_view_current == 3){
        post_view_current = 1;
    }
    else{
        post_view_current ++;
    }
});

add_items.addEventListener("click", function(){

    let selected_items = [];

    console.log("click")

    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        selected_items.push(checkbox.value);
    });

    const items_container = document.getElementById("items");

    let ul = document.createElement("ul");
    items_container.appendChild(ul);

    selected_items.forEach(function(item) {
        const new_item = document.createElement("span");
        new_item.style = "background-color: <%= type.bg_color %>; color: <%= type.txt_color %>;" 
        new_item.appendChild = "<%= type.name %>"

        items_container.appendChild(new_item);
    });

    document.getElementById("types_meals").style.display = "none";
    
});
