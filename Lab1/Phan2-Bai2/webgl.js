function main() {
    var canvas = document.getElementById("testCanvas");
    var gl = getWebGLContext(canvas);
    var VSHADER_SOURCE =  'void main(){'
    ' gl_Position = vec4(0.75,0.75,0.0,1.0);'
    ' gl_PointSize = 10.0;'
' }';
    var FSHADER_SOURCE = document.getElementById('fragmentShader').text;
    if (!gl) {
        console.log("Failed");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to init shaders.")
        return;
    }

    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1);
}