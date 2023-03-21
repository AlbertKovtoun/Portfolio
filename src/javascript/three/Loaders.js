import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { loadingScreen, textureLoaderManager } from "./Experience"

export class Loaders {
  constructor() {
    this.loadingManager = new THREE.LoadingManager(() => {
      loadingScreen.playLoadingScreenAnimations()
    })

    this.textureLoader = new THREE.TextureLoader(this.loadingManager)

    this.gltfLoader = new GLTFLoader(this.loadingManager)

    this.cubeTextureLoader = new THREE.CubeTextureLoader(this.loadingManager)
  }
}
