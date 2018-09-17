function main() {
    var canvas = document.getElementById("testCanvas");
    if (!canvas) {
        console.log("Failed");
        return;
    }

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fillRect(100, 10, 200, 150);
}