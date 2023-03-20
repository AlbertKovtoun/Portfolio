import * as THREE from "three"
import { gsap } from "gsap"
import { loaders, renderer, scene, textureLoaderManager } from "./Experience"

import whitePolesVertexShader from "../../shaders/WhitePoles/vertex.glsl?raw"
import whitePolesFragmentShader from "../../shaders/WhitePoles/fragment.glsl?raw"

import car0VertexShader from "../../shaders/Car0/vertex.glsl?raw"
import car0FragmentShader from "../../shaders/Car0/fragment.glsl?raw"

export class World {
  constructor() {
    this.trainLightsonMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })
    this.trainLightsoffMaterial = new THREE.MeshBasicMaterial({
      color: 0x1f0000,
    })

    this.trainLightsFlicker = false

    setInterval(() => {
      this.setTrainLightsFlickering(this.trainLightsFlicker)
    }, 500)

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

    this.poles = worldGroup.getObjectByName("Poles")
    this.poles.material.map.anisotropy =
      renderer.renderer.capabilities.getMaxAnisotropy()
  }

  setTrainSequence(worldGroup) {
    this.trainLight0 = worldGroup.getObjectByName("TrainLight0")
    this.trainLight0.material = this.trainLightsoffMaterial

    this.trainLight1 = worldGroup.getObjectByName("TrainLight1")
    this.trainLight1.material = this.trainLightsoffMaterial

    this.trainLight2 = worldGroup.getObjectByName("TrainLight2")
    this.trainLight2.material = this.trainLightsoffMaterial

    this.trainLight3 = worldGroup.getObjectByName("TrainLight3")
    this.trainLight3.material = this.trainLightsoffMaterial

    this.trainLightArrow = worldGroup.getObjectByName("TrainLightArrow")
    this.trainLightArrow.material = this.trainLightsoffMaterial

    this.crossingBarArm0 = worldGroup.getObjectByName("CrossingBarArm0")
    this.crossingBarArm1 = worldGroup.getObjectByName("CrossingBarArm1")

    this.train = worldGroup.getObjectByName("Train")
  }

  setTrainLightsFlickering(trainLightsFlicker) {
    if (trainLightsFlicker) {
      this.trainLightsSwitch = !this.trainLightsSwitch
      if (this.trainLightsSwitch) {
        this.trainLight0.material = this.trainLightsonMaterial
        this.trainLight1.material = this.trainLightsoffMaterial
        this.trainLight2.material = this.trainLightsoffMaterial
        this.trainLight3.material = this.trainLightsonMaterial
        this.trainLightArrow.material = this.trainLightsonMaterial
      } else {
        this.trainLight0.material = this.trainLightsoffMaterial
        this.trainLight1.material = this.trainLightsonMaterial
        this.trainLight2.material = this.trainLightsonMaterial
        this.trainLight3.material = this.trainLightsoffMaterial
        this.trainLightArrow.material = this.trainLightsoffMaterial
      }
    }
  }

  startTrainLightsFlickering() {
    this.trainLightsFlicker = true
  }

  stopTrainLightsFlickering() {
    this.trainLightsFlicker = false
    this.trainLight0.material = this.trainLightsoffMaterial
    this.trainLight1.material = this.trainLightsoffMaterial
    this.trainLight2.material = this.trainLightsoffMaterial
    this.trainLight3.material = this.trainLightsoffMaterial
    this.trainLightArrow.material = this.trainLightsoffMaterial
  }

  playTrainAnimation() {
    //Make lights flicker
    this.startTrainLightsFlickering()

    //Arms down
    gsap.to(this.crossingBarArm0.rotation, {
      z: -Math.PI / 2,
      duration: 5,
      ease: "power2.inOut",
      delay: 2,
      onStart: () => {
        console.log("Train animation started")
      },
    })
    gsap.to(this.crossingBarArm1.rotation, {
      z: Math.PI / 2,
      duration: 5,
      ease: "power2.inOut",
      delay: 2.5,
      onStart: () => {
        console.log("Train animation started")
      },
    })

    //Arms up
    gsap.to(this.crossingBarArm0.rotation, {
      z: 0,
      duration: 5,
      ease: "power2.inOut",
      delay: 28,

      onComplete: () => {
        this.stopTrainLightsFlickering()
      },
    })
    gsap.to(this.crossingBarArm1.rotation, {
      z: 0,
      duration: 5,
      ease: "power2.inOut",
      delay: 28.5,
    })

    //Train
    gsap.to(this.train.position, {
      x: -20,
      duration: 20,
      ease: "none",
      delay: 8,

      onComplete: () => {
        this.train.position.x = 20
      },
    })
  }

  flyPlanes() {
    this.plane0 = this.worldGroup.getObjectByName("Plane0")
    this.plane1 = this.worldGroup.getObjectByName("Plane1")

    gsap.to(this.plane0.position, {
      x: -40,
      duration: 40,
      ease: "none",
      repeat: -1,
    })

    gsap.to(this.plane1.position, {
      x: 40,
      duration: 60,
      ease: "none",
      repeat: -1,
      delay: 10,

      onRepeat: () => {
        this.playTrainAnimation()
      },
    })
  }

  setWorld() {
    loaders.gltfLoader.load("/models/Scene.glb", (gltf) => {
      this.worldGroup = gltf.scene

      this.setMaxAnisotropy(this.worldGroup)
      this.setTrainSequence(this.worldGroup)
      this.flyPlanes(this.worldGroup)

      setTimeout(() => {
        this.playTrainAnimation()
      }, 5000)

      this.whitePoles = this.worldGroup.getObjectByName("WhitePoles")
      this.whitePoles.material = this.whitePolesMaterial

      this.car0 = this.worldGroup.getObjectByName("Car")
      this.car0.material = this.car0Material

      // worldGroup.traverse((child) => {
      //   if (child.isMesh && child.name === "Car") {
      //     console.log(child)
      //     child.material.envMap = textureLoaderManager.envMap
      //     child.material.envMapIntensity = 2
      //   }
      // })

      // console.log(textureLoaderManager.envMap)

      scene.add(this.worldGroup)
    })
  }

  update(elapsedTime) {}
}
