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
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    canvas.onmousedown = function (e) { 
        click(e, gl, canvas, a_Pos);
    }
    gl.clear(gl.COLOR_BUFFER_BIT);

    var g_points = [];
    var g_colors = [];
    function click(ev, gl, canvas, a_Position) {
        // console.log(ev);
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();

        x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

        g_points.push([x, y]);
        if (x >= 0 && y >= 0) {
            g_colors.push([0, 1, 1, 1]);
        }
        if (x <= 0 && y >= 0) {
            g_colors.push([1, 0, 0, 1]);
        }
        if (x <= 0 && y <= 0) {
            g_colors.push([0, 1, 0, 1]);
        }
        if (x >= 0 && y <= 0) {
            g_colors.push([1, 1, 0, 1]);
        }
       // console.log(g_points);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // console.log('g_points: ', g_points, "+", g_points.length)
        // var len = g_points.length;
        for (var i = 0; i < g_points.length; i++) {
            // console.log(i);
            var xy = g_points[i];
            var color = g_colors[i];
            console.log(color)
            // console.log(xy);
            gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
            gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);
            gl.drawArrays(gl.POINTS, 0, 1);
            
        }
        
    }


    // gl.vertexAttrib3f(a_Pos, -0.8, -0.8, 0.0);
    // gl.vertexAttrib1f(a_Size, 20.0);
    
    // gl.clearColor(1.0, 1.0, 0.0, 1.0);

    // gl.drawArrays(gl.POINTS, 0, 1);
}