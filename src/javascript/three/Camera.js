import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { canvas, scene, sizes } from "./Experience"

export class Camera {
  constructor() {
    this.camera
    this.controls

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
    this.camera.position.set(-0.34, 1.5, 9.9)

    //Option2
    // this.camera.position.set(0, 1.2379, 8)

    scene.add(this.camera)
  }

  setCameraControls() {
    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping = true
    this.controls.target.set(0, 1.5, 0)
  }
}
