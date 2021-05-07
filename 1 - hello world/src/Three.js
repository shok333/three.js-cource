import * as THREE from "three";

const sceneSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

class Three {
  constructor({canvasContainer}) {
    this.initScene();
    this.initCamera();
    this.initRenderer(canvasContainer);
    this.renderRect();
    this.render();
  }

  initRenderer(canvasContainer) {
    this.renderer = new THREE.WebGLRenderer();
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

    this.camera.position.set(sceneSizes.width / 2, sceneSizes.height / -2, 1);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  renderRect() {
    const boxGeometry = new THREE.BoxGeometry(200, 200, 200);
    const planeGeometry = new THREE.PlaneGeometry(200, 200);

    const material = new THREE.MeshBasicMaterial({color: "red"});

    const box = new THREE.Mesh(boxGeometry, material);

    box.position.x = sceneSizes.width / 2 + 200;
    box.position.y = -sceneSizes.height / 2;
    box.position.z = -100;

    box.rotateX(Math.PI / 6);
    box.rotateY(Math.PI / 6);

    const plane = new THREE.Mesh(planeGeometry, material);

    plane.position.x = sceneSizes.width / 2 - 200;
    plane.position.y = -sceneSizes.height / 2;
    plane.position.z = -100;

    plane.rotateX(Math.PI / 6);
    plane.rotateY(Math.PI / 6);

    this.scene.add(box);
    this.scene.add(plane);
  }
}

export default Three;
