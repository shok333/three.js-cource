import * as THREE from "three";
import {Line2, LineGeometry, LineMaterial} from "three-fatline";

const sceneSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

class Three {
  constructor({canvasContainer}) {
    this.initScene();
    this.initCamera();
    this.initRenderer(canvasContainer);
    this.renderChart();
    this.render();
  }

  initRenderer(canvasContainer) {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(sceneSizes.width, sceneSizes.height);

    canvasContainer.appendChild(this.renderer.domElement);
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color("grey");
  }

  initCamera() {
    this.camera = new THREE.OrthographicCamera(
      sceneSizes.width / -2,
      sceneSizes.width / 2,
      sceneSizes.height / 2,
      sceneSizes.height / -2,
      200,
      -200
    );

    this.camera.position.set(0, 0, 1); // перемещаем камеру в нулевую координату
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  renderChart() {
    let chart = [-160, 0, 0, 0, -400, 0, 360, 180, 0];

    const geometry = new LineGeometry();
    geometry.setPositions(chart);

    const material = new LineMaterial({
      color: "red",
      linewidth: 100,
      resolution: new THREE.Vector2(sceneSizes.width, sceneSizes.height),
    });

    const line = new Line2(geometry, material);

    line.computeLineDistances();

    this.scene.add(line);
  }
}

export default Three;
