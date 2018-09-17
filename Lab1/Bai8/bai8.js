function tatDen() {
    if (document.getElementById('tat').checked == true) {
        myForm.bat.checked = false;
        document.bgColor = 'black';
    }
}
function batDen() {
    if (document.getElementById('bat').checked == true) {
        myForm.tat.checked = false;
        document.bgColor = 'white';
    }
}