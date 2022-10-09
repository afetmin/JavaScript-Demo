function getCanvas(id) {
    return document.querySelector(`#${id}`);
}

function getWebGLContext(canvas) {
    return canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
}

function createShaderFromScript(gl, shaderType, id) {
    var shaderSource = document.querySelector(`#${id}`).innerHTML;
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    //创建着色器程序
    var program = gl.createProgram();
    //将顶点着色器挂载在着色器程序上。
    gl.attachShader(program, vertexShader);
    //将片元着色器挂载在着色器程序上。
    gl.attachShader(program, fragmentShader);
    //链接着色器程序
    gl.linkProgram(program);
    return program;
}