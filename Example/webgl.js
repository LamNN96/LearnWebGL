

function main() {
    var canvas = document.getElementById("testCanvas");
    var gl = getWebGLContext(canvas);
    
    var FSHADER_SOURCE = document.getElementById('fragmentShader').text;
    if (!gl) {
        console.log("Failed");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to init shaders.")
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    canvas.onmousedown = function (e) {
        click(e, gl, canvas, a_Position);
    }

    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.POINTS, 0 , 1);

    var g_points = [];
    function click(ev, gl, canvas, a_Position) {
        // console.log(ev);
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

        g_points.push([x, y]);
        console.log(g_points);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // var len = g_points.length;
        for (var i = 0; i < g_points.length; i++) {
            console.log(i);
            var xy = g_points[i];
            console.log(xy);
            gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }

}

