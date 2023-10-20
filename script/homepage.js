function handleGetFormData() {
    let valueInput = {};

    valueInput.name = document.getElementById('name').value; 
    valueInput.email = document.getElementById('email').value;
    valueInput.city = document.getElementById('city').value;  
    valueInput.zipCode = document.getElementById('zip-code').value; 
    valueInput.status = document.getElementById('status').checked; 

    return valueInput;
}

function isNumber(data) {
    return !isNaN(data);
}

function checkboxIsChecked(){
    let cek = document.getElementById('status').checked;
    if(cek) return true;
    else false;
}
function validateFormData(data){
    if(data !== null && isNumber(data.zipCode) && checkboxIsChecked()) return true;
    else false;
}

document.getElementById('submit-form').addEventListener("click", submit);

function submit(event){
    event.preventDefault();
    let container=document.getElementById('warning');
    if(validateFormData(handleGetFormData())) container.replaceChildren();
    else container.innerHTML = '<p>Periksa form anda sekali lagi</p>';
}

function togglePopup() {
    let popup = document.getElementById("popup-container");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

document.addEventListener("click", function(event) {
    let popup = document.getElementById("popup-container");
    let button = document.querySelector(".float-button");

    if (event.target !== popup && event.target !== button && !popup.contains(event.target)) {
        popup.style.display = "none";
    }
});

