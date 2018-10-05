function main() {
    var canvas = document.getElementById("testCanvas");
    var gl = getWebGLContext(canvas);
    var VSHADER_SOURCE =  document.getElementById('vertexShader').text;
    var FSHADER_SOURCE = document.getElementById('fragmentShader').text;
    if (!gl) {
        console.log("Failed");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to init shaders.")
        return;
    }
    
    var a_Pos = gl.getAttribLocation(gl.program, 'a_Position');
    var a_Size = gl.getAttribLocation(gl.program, 'a_PointSize');

    canvas.onmousedown = function (e) { 
        click(e, gl, canvas, a_Pos);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);

    var g_points = [];
    function click(ev, gl, canvas, a_Position) {
        // console.log(ev);
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

        g_points.push([x, y]);
       // console.log(g_points);
        gl.clear(gl.COLOR_BUFFER_BIT);
        console.log('g_points: ', g_points, "+", g_points.length)
        // var len = g_points.length;
        for (var i = 0; i < 6; i++) {
            console.log(i);
            var xy = g_points[i];
            console.log(xy);
            gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
            
            gl.drawArrays(gl.POINTS, 0, 1);
            
        }
        if (g_points.length >= 5) {
            gl.clearColor(1.0, 1.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    }


    // gl.vertexAttrib3f(a_Pos, -0.8, -0.8, 0.0);
    // gl.vertexAttrib1f(a_Size, 20.0);
    
    // gl.clearColor(1.0, 1.0, 0.0, 1.0);

    // gl.drawArrays(gl.POINTS, 0, 1);
}