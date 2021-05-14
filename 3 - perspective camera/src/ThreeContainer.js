import {memo, useRef, useEffect, useState} from "react";
import {Slider} from "antd";

import Three from "./Three";

const NativeRenderer = () => {
  const threeRef = useRef(); //Используется для обращения к контейнеру для canvas
  const three = useRef(); //Служит для определения, создан ли объект, чтобы не создавать повторный
  const [fov, fovChange] = useState(50);
  const [near, nearChange] = useState(1);
  const [far, farChange] = useState(2000);
  const [aspect, aspectChange] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Создание объекта класса Three, предназначенного для работы с three.js
  useEffect(() => {
    if (!three.current) {
      three.current = new Three({
        canvasContainer: threeRef.current,
        aspect,
        near,
        far,
      });
    }
  }, [aspect, near, far]);

  useEffect(() => {
    if (three.current) {
      three.current.fovChange(fov);
    }
  }, [fov]);

  useEffect(() => {
    if (three.current) {
      three.current.aspectChange(aspect);
    }
  }, [aspect]);

  useEffect(() => {
    if (three.current) {
      three.current.nearChange(near);
    }
  }, [near]);

  useEffect(() => {
    if (three.current) {
      three.current.farChange(far);
    }
  }, [far]);

  return (
    <div>
      <div className="container" ref={threeRef} />
      <div className="toolbar">
        <div>
          <span>aspect width</span>
          <Slider
            value={aspect.width}
            min={0}
            max={2000}
            onChange={(width) => aspectChange((prev) => ({...prev, width}))}
          />
        </div>
        <div>
          <span>aspect height</span>
          <Slider
            value={aspect.height}
            min={0}
            max={2000}
            onChange={(height) => aspectChange((prev) => ({...prev, height}))}
          />
        </div>
        <div>
          <span>fov</span>
          <Slider
            value={fov}
            min={-360}
            max={360}
            onChange={(value) => fovChange(value)}
          />
        </div>
        <div>
          <span>near</span>
          <Slider
            value={near}
            min={-100}
            max={100}
            onChange={(value) => nearChange(value)}
          />
        </div>
        <div>
          <span>far</span>
          <Slider
            value={far}
            min={0}
            max={2000}
            onChange={(value) => farChange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(NativeRenderer);
