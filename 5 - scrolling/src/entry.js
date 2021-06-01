import Three from "./Three";

import "./style.css";

const sceneSizes = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
};

new Three({
  sceneSizes,
  canvasContainer: document.getElementById("root"),
});
