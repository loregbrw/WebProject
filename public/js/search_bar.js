const input = document.getElementById("search_bar");

function listItens(results){
    
}

input.addEventListener("input", (e) =>{
    let value = e.target.value;

    if(value && value.trim().length > 0){
        value = value.trim().toLowerCase
    }
})