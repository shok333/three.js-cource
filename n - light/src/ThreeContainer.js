import {memo, useRef, useEffect} from "react";

import Three from "./Three";

const NativeRenderer = () => {
  const threeRef = useRef(); //Используется для обращения к контейнеру для canvas
  const three = useRef(); //Служит для определения, создан ли объект, чтобы не создавать повторный

  // Создание объекта класса Three, предназначенного для работы с three.js
  useEffect(() => {
    if (!three.current) {
      three.current = new Three({
        canvasContainer: threeRef.current,
        aspect: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    }
  }, []);

  return <div className="container" ref={threeRef} />;
};

export default memo(NativeRenderer);
