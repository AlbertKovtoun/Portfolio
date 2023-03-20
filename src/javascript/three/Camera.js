import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { canvas, scene, sizes } from "./Experience"

export class Camera {
  constructor() {
    this.cursor = { x: 0, y: 0 }

    this.setCamera()
    this.setCameraControls()
  }

  setCamera() {
    //!Still trying to mess with the right camera position and fov
    this.camera = new THREE.PerspectiveCamera(
      // 50,
      40,
      sizes.width / sizes.height,
      0.1,
      1000
    )

    //Option1
    this.camera.position.set(-0.34, 1, 9.8)

    //Option2
    // this.camera.position.set(0, 1.2379, 8)

    scene.add(this.camera)
  }

  setCameraControls() {
    // this.controls = new OrbitControls(this.camera, canvas)
    // this.controls.enableDamping = true
    // this.controls.target.set(0, 1.5, 0)

    window.addEventListener("mousemove", (ev) => {
      this.cursor.x = ev.clientX / sizes.width - 0.5
      this.cursor.y = ev.clientY / sizes.height - 0.5
    })
  }

  update() {
    this.camera.lookAt(0, 1, 5)

    const cameraX = this.cursor.x - 0.1
    const cameraY = -this.cursor.y + 1

    this.camera.position.x += (cameraX - this.camera.position.x) * 0.04
    this.camera.position.y += (cameraY - this.camera.position.y) * 0.04
  }
}
