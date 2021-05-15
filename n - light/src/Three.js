import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";

const sceneSizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

class Three {
  constructor({canvasContainer, aspect, near, cameraZ, far}) {
    this.initScene();
    this.addLight();
    this.initCamera(aspect, near, far, cameraZ);
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

  addLight() {
    const color = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.HemisphereLight(color, intensity);

    this.scene.add(light);
  }

  initCamera({width, height}) {
    const fov = 50;
    const near = 1;
    const far = 2000;
    const aspect = width / height; // the canvas default
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.set(sceneSizes.width / 2, sceneSizes.height / -2, 1);
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
    const sphereGeometry = new THREE.SphereGeometry(100, 12, 8);
    const sphereGeometry2 = new THREE.SphereGeometry(100, 12, 8);
    const sphereGeometry3 = new THREE.SphereGeometry(100, 12, 8);

    const sphereMaterial = new THREE.MeshBasicMaterial({color: "red"});
    const sphereMaterial2 = new THREE.MeshPhongMaterial({
      color: "green",
      shininess: 150,
      //   flatShading: true,
      metalness: 0.4,
    });
    const sphereMaterial3 = new THREE.MeshPhysicalMaterial({
      color: "red",
      shininess: 150,
      flatShading: true,
      metalness: 0.4,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    const sphere3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);

    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = -200;

    sphere2.position.x = 0;
    sphere2.position.y = 0;
    sphere2.position.z = 200;

    this.scene.add(sphere);
    this.scene.add(sphere2);
    this.scene.add(sphere3);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export default Three;
