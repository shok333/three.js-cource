import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

// import OrbitControls from "three-orbitcontrols";

const sceneSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

class Three {
  constructor({canvasContainer, aspect, near, cameraZ, far}) {
    this.initScene();
    this.initCamera(aspect, near, far, cameraZ);
    this.initCameraHelper();
    this.initRenderer(canvasContainer);
    this.initOrbitControls();
    this.renderRect();
    this.render();

    const animate = () => {
      requestAnimationFrame(animate);

      //   this.controls.update();

      this.render();
    };

    animate();
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color("grey");
  }

  initCamera({width, height}, near, far, cameraZ) {
    const fov = 50;
    const aspect = width / height; // the canvas default
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.set(
      sceneSizes.width / 2,
      sceneSizes.height / -2,
      cameraZ
    );
  }

  initCameraHelper() {
    const helper = new THREE.CameraHelper(this.camera);
    this.scene.add(helper);
  }

  initRenderer(canvasContainer) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(sceneSizes.width, sceneSizes.height);

    canvasContainer.appendChild(this.renderer.domElement);
  }

  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  renderRect() {
    const coneGeometry = new THREE.ConeGeometry(100, 400, 200);
    const boxGeometry = new THREE.BoxGeometry(1600, 200, 200);

    const coneMaterial = new THREE.MeshBasicMaterial({color: "red"});
    const boxMaterial = new THREE.MeshBasicMaterial({color: "blue"});

    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    cone.position.x = 0;
    cone.position.y = 0;
    cone.position.z = -200;

    this.scene.add(box);
    this.scene.add(cone);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  fovChange(fov) {
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();

    this.render();
  }

  aspectChange({width, height}) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.render();
  }

  nearChange(near) {
    this.camera.near = near;
    this.camera.updateProjectionMatrix();

    this.render();
  }

  farChange(far) {
    this.camera.far = far;
    this.camera.updateProjectionMatrix();

    this.render();
  }

  cameraZChange(cameraZ) {
    this.camera.position.z = cameraZ;
    this.camera.updateProjectionMatrix();

    this.render();
  }
}

export default Three;
