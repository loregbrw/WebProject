const add_input = document.getElementById("add_input_button");
const add_textarea = document.getElementById("add_textarea_button");
const change_view_setting = document.getElementById("post_view_setting");
const add_items = document.getElementById("add_items");

let post_view_current = 1;

add_input.addEventListener("click", function(){
    var ingredients = document.getElementById("ingredients");
    var inputs = ingredients.querySelectorAll('input[name^="ingredients"]');

    const new_div = document.createElement("div");
    const new_number = document.createElement("input");
    const new_input = document.createElement("input");

    const newIndex = inputs.length;

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

    new_number.name = `ingredients[${newIndex}][ingredient_weight]`;
    new_input.name = `ingredients[${newIndex}][ingredient_description]`;
});


add_textarea.addEventListener("click", function(){
    var steps = document.getElementById("steps");
    var inputs = steps.querySelectorAll('input[name^="steps"]');


    const new_div = document.createElement("div");
    const new_number = document.createElement("input");
    const new_textarea = document.createElement("textarea");

    const newIndex = inputs.length;

    new_textarea.placeholder = "Passo";
    new_number.type = "number";
    new_number.min = 1;
    new_number.placeholder = "1";
    new_number.setAttribute('class', "width-50px");
    new_div.setAttribute('class', "flex-row gap-20");

    steps.appendChild(new_div);
    new_div.appendChild(new_number);
    new_div.appendChild(new_textarea);

    new_number.name = `steps[${newIndex}][step_weight]`
    new_textarea.name = `steps[${newIndex}][step_description]`
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

    console.log("click")

    var selected_meals = [];
    var mealCheckboxes = document.querySelectorAll('input[name="meal_id"]');
    mealCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selected_meals.push(checkbox.value);
        }
    });

    var selected_types = [];
    var typeCheckboxes = document.querySelectorAll('input[name="type_id"]');
    typeCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selected_types.push(checkbox.value);
        }
    });

    fetch('pagAddRecipePost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            meals: selected_meals,
            types: selectedT_types
        })
    })  

    document.getElementById("types_meals").style.display = "none";
    
});
