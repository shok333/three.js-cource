import * as THREE from "three";
import {MapControls} from "three/examples/jsm/controls/OrbitControls.js";

class Three {
  constructor({canvasContainer, sceneSizes}) {
    // Для использования внутри класса, добавляем параметры к this
    this.sceneSizes = sceneSizes;

    this.initRenderer(canvasContainer); // создание рендерера
    this.initScene(); // создание сцены
    this.initCamera(); // создание камеры
    this.renderRect(); // Добавляем квадрат на сцену
    this.renderCirle(); // Добавляем круг на сцену

    this.addMapControls();
  }

  initRenderer(canvasContainer) {
    // Создаём редерер (по умолчанию будет использован WebGL2)
    // antialias отвечает за сглаживание объектов
    this.renderer = new THREE.WebGLRenderer({antialias: true});

    //Задаём размеры рендерера
    this.renderer.setSize(this.sceneSizes.width, this.sceneSizes.height);

    //Добавляем рендерер в узел-контейнер, который мы прокинули извне
    canvasContainer.appendChild(this.renderer.domElement);
  }

  initScene() {
    // Создаём объект сцены
    this.scene = new THREE.Scene();

    // Задаём серый цвет фона
    this.scene.background = new THREE.Color("grey");
  }

  initCamera() {
    // Создаём ортографическую камеру (Идеально подходит для 2d)
    this.camera = new THREE.OrthographicCamera(
      -this.sceneSizes.width / 2, // Левая граница камеры
      this.sceneSizes.width / 2, // Правая граница камеры
      this.sceneSizes.height / 2, // Верхняя граница камеры
      -this.sceneSizes.height / 2, // Нижняя граница камеры
      100, // Ближняя граница
      -300 // Дальняя граница
    );
  }

  render() {
    // Выполняем рендеринг сцены (нужно запускать для отображения изменений)
    this.renderer.render(this.scene, this.camera);
  }

  renderRect() {
    const width = 200;
    const height = 200;

    // Создаём геометрию - квадрат с высотой "height" и шириной "width"
    const geometry = new THREE.PlaneGeometry(width, height);

    // Создаём материали с цветом "color"
    const material = new THREE.MeshBasicMaterial({color: "red"});

    // Создаём сетку - квадрат
    this.rect = new THREE.Mesh(geometry, material);

    this.rect.position.x = 250;

    this.scene.add(this.rect);
  }

  renderCirle() {
    const radius = 100;
    const segmentsCount = 50;

    // Создаём геометрию - квадрат с высотой "height" и шириной "width"
    const geometry = new THREE.CircleBufferGeometry(radius, segmentsCount);

    // Создаём материали с цветом "color"
    const material = new THREE.MeshBasicMaterial({color: "blue"});

    // Создаём сетку - квадрат
    this.rect = new THREE.Mesh(geometry, material);

    this.rect.position.x = -250;

    this.scene.add(this.rect);
  }

  addMapControls() {
    const controls = new MapControls(this.camera, this.renderer.domElement);

    controls.screenSpacePanning = true;

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      this.render();
    };

    animate();
  }
}

export default Three;
