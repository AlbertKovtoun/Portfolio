import * as THREE from "three"
import { loaders, renderer } from "./Experience"

export class TextureLoaderManager {
  constructor() {
    this.loadTextures()
  }

  loadTextures() {
    this.hl0Texture = loaders.textureLoader.load("/textures/HL0Bake.jpg")
    this.hl0Texture.flipY = false
    this.hl0Texture.encoding = THREE.sRGBEncoding
    this.hl0Texture.anisotropy = renderer.renderer.capabilities.getMaxAnisotropy()
  }
}
