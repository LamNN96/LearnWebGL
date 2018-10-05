var Tx = 0.5, Ty = 0.5, Tz = 0.5;
var ANGLE = 90;

function main() {
    var canvas = document.getElementById("testCanvas");
    var gl = getWebGLContext(canvas);
    var VSHADER_SOURCE = document.getElementById('vertexShader').text;
    var FSHADER_SOURCE = document.getElementById('fragmentShader').text;
    if (!gl) {
        console.log("Failed");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to init shaders.")
        return;
    }
    var n = initVertexBuffer(gl);
    if (n < 0) {
        console.log("Failed");
        return;
    }
    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    var uTransMatrix = new Float32Array([
        1 , 0 , 0 , 0 ,
        0 , 1 , 0 , 0 ,
        0 , 0 , 1 , 0.0,
        0.5, 0.5, 0.5, 1.0
    ]);
    var uScalesMatrix = new Float32Array([
        0.5, 0, 0, 0,
        0, 0.5, 0, 0,
        0.0, 0.0, 0.5, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    var uRotateMatrix = new Float32Array([
        cosB, sinB, 0, 0,
        -sinB, cosB, 0, 0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    //get location of u_Scale
    var u_TransMatrix = gl.getUniformLocation(gl.program, 'u_TransMatrix');
    var u_ScalesMatrix = gl.getUniformLocation(gl.program, 'u_ScalesMatrix');
    var u_RotateMatrix = gl.getUniformLocation(gl.program, 'u_RotateMatrix');

    // var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
    // var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');
    // console.log(u_Scale);
    // //
    gl.uniformMatrix4fv(u_TransMatrix, false, uTransMatrix);
    gl.uniformMatrix4fv(u_ScalesMatrix, false, uScalesMatrix);
    gl.uniformMatrix4fv(u_RotateMatrix, false, uRotateMatrix);
    // gl.uniform4f(u_Trans, Tx, Ty, Tz, 0.0);
    // gl.uniform1f(u_CosB, cosB);
    // gl.uniform1f(u_SinB, sinB);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);


    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffer(gl) {
    var vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);

    var n = 3;

    var vertexBuffer = gl.createBuffer();

    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    return n;
}

