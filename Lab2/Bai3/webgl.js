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
    gl.vertexAttrib3f(a_Pos, -0.8, -0.8, 0.0);
    gl.vertexAttrib1f(a_Size, 20.0);

    gl.clearColor(1.0, 1.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1);
}