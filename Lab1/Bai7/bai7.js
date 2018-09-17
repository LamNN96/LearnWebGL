function kiemTra() {
    var checkBox = document.getElementById("chbKiemTra");
    if (!checkBox.checked) {
        document.bgColor = 'white';
    } else {
        document.bgColor = 'black';
    }
}