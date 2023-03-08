import * as THREE from "three"
import { loaders, renderer, scene, textureLoaderManager } from "./Experience"

import whitePolesVertexShader from "../../shaders/WhitePoles/vertex.glsl?raw"
import whitePolesFragmentShader from "../../shaders/WhitePoles/fragment.glsl?raw"

import car0VertexShader from "../../shaders/Car0/vertex.glsl?raw"
import car0FragmentShader from "../../shaders/Car0/fragment.glsl?raw"

export class World {
  constructor() {
    this.setMaterials()
    this.setWorld()
  }

  setMaterials() {
    this.hl0Material = new THREE.MeshBasicMaterial({
      map: textureLoaderManager.hl0Texture,
    })

    this.whitePolesMaterial = new THREE.ShaderMaterial({
      vertexShader: whitePolesVertexShader,
      fragmentShader: whitePolesFragmentShader,
    })

    this.car0Material = new THREE.ShaderMaterial({
      vertexShader: car0VertexShader,
      fragmentShader: car0FragmentShader,
    })
  }

  setMaxAnisotropy(worldGroup) {
    this.hl0 = worldGroup.getObjectByName("HL0")
    this.hl0.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()

    this.hl12 = worldGroup.getObjectByName("HL12")
    this.hl12.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()

    this.hl34 = worldGroup.getObjectByName("HL34")
    this.hl34.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()

    this.hr12 = worldGroup.getObjectByName("HR12")
    this.hr12.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()

    this.hr0 = worldGroup.getObjectByName("HR0")
    this.hr0.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()

    this.roadClose = worldGroup.getObjectByName("RoadClose")
    this.roadClose.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()

    this.roadFar = worldGroup.getObjectByName("RoadFar")
    this.roadFar.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()
  }

  setWorld() {
    loaders.gltfLoader.load("/models/Scene.glb", (gltf) => {
      let worldGroup = gltf.scene

      this.setMaxAnisotropy(worldGroup)

      this.whitePoles = worldGroup.getObjectByName("WhitePoles")
      this.whitePoles.material = this.whitePolesMaterial

      this.car0 = worldGroup.getObjectByName("Car")
      this.car0.material = this.car0Material

      // worldGroup.traverse((child) => {
      //   if (child.isMesh && child.name === "Car") {
      //     console.log(child)
      //     child.material.envMap = textureLoaderManager.envMap
      //     child.material.envMapIntensity = 2
      //   }
      // })

      // console.log(textureLoaderManager.envMap)

      scene.add(worldGroup)
    })
  }
}
