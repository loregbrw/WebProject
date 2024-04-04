
// const color_selector = document.getElementById("color-box");
// const color = document.querySelector('input[type=color]');

// const { text } = require("express");

// color_selector.style.backgroundColor = color.value;
    
const background_input = document.getElementById('color-selector-background');
const font_input = document.getElementById('color-selector-font');
const text_box = document.getElementById('color-box');

background_input.addEventListener('change', function() {
    const selected_color = background_input.value;

    text_box.style.backgroundColor = selected_color;
    console.log(selected_color);
});

font_input.addEventListener('change', function() {
    const selected_color = font_input.value;

    text_box.style.color = selected_color;
    console.log(selected_color);
});
