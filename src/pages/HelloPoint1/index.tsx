import React, { useEffect, useRef, useState } from "react";
import styles from "../HelloCanvas/index.module.css";

export default function HelloPoint1() {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refDraw = useRef<HTMLDivElement>(null);
  const [errorText, setErrorText] = useState("");

  const getCanvas = (): HTMLCanvasElement => {
    return refCanvas.current!;
  };

  const getDraw = (): HTMLDivElement => {
    return refDraw.current!;
  };

  const getWebGL = () => getCanvas().getContext("webgl");

  const initShaderProgram = (gl: WebGLRenderingContext, VSHADER_SOURCE: string, FSHADER_SOURCE: string) => {
    const vertexShader = loaderShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
    const fragmentShader = loaderShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
    const shaderProgram = gl.createProgram();
    if (!shaderProgram || !vertexShader || !fragmentShader) return null;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    const status = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
    if (!status) {
      gl.deleteProgram(shaderProgram);
      return null;
    }
    return shaderProgram;
  };

  const loaderShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!status) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const VSHADER_SOURCE = `
    void main() {
      gl_Position = vec4(0.0,0.0,0.0,1.0);
      gl_PointSize = 20.0;
    }
  `;

  const FSHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  `;

  const draw = (gl: WebGLRenderingContext | null) => {
    if (gl) {
      const shaderProgram = initShaderProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
      if (!shaderProgram) {
        setErrorText("Not support WebGL");
        return;
      } else {
        gl.clearColor(0.02, 0.75, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(shaderProgram);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    } else {
      setErrorText("Not support WebGL");
      return;
    }
  };

  const canvasResize = () => {
    getCanvas().height = getDraw().clientHeight;
    getCanvas().width = getDraw().clientWidth;
  };

  useEffect(() => {
    canvasResize();
    draw(getWebGL());
  }, [])

  return (
    <div className={styles.container}>
      <h2>WebGL程序：绘制一个点</h2>
      <div ref={refDraw} className={styles.draw}>
        {
          errorText && <p>{errorText}</p>
        }
        <canvas ref={refCanvas}>
          Please the brower support "canvas"
        </canvas>
      </div>
    </div>
  );
}

