import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

export default function HelloCanvas() {
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

  const draw = (gl: WebGLRenderingContext | null) => {
    if (gl) {
      gl.clearColor(0.02, 0.75, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    } else {
      setErrorText("Not support WebGL");
    }
  };

  const canvasResize = () => {
    getCanvas().height = getDraw().clientHeight;
    getCanvas().width = getDraw().clientWidth;
  };

  useEffect(() => {
    canvasResize();
    draw(getWebGL());
    window.addEventListener('resize', canvasResize);
    return () => {
      window.removeEventListener('resize', canvasResize);
    }
  }, [])

  return (
    <div className={styles.container}>
      <h2>最简短的WebGL程序：清空绘图区</h2>
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

