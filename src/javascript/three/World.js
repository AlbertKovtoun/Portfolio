import * as THREE from "three"
import { gsap } from "gsap"
import {
  loaders,
  pane,
  renderer,
  scene,
  textureLoaderManager,
} from "./Experience"

import whitePolesVertexShader from "../../shaders/WhitePoles/vertex.glsl?raw"
import whitePolesFragmentShader from "../../shaders/WhitePoles/fragment.glsl?raw"

import car0VertexShader from "../../shaders/Car0/vertex.glsl?raw"
import car0FragmentShader from "../../shaders/Car0/fragment.glsl?raw"

import toonVertexShader from "../../shaders/Toon/vertex.glsl?raw"
import toonFragmentShader from "../../shaders/Toon/fragment.glsl?raw"

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
    this.setTweaks()
  }

  setMaterials() {
    this.whitePolesMaterial = new THREE.ShaderMaterial({
      vertexShader: whitePolesVertexShader,
      fragmentShader: whitePolesFragmentShader,
    })

    this.bikeGreenMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,

      uniforms: {
        uModelColor: { value: new THREE.Color(0x00ff00) },
        uAlStrength: { value: 0.4 },
        uDlStrength: { value: 0.6 },
        uLightDirection: { value: new THREE.Vector3(1.0, 0.9, 0.2) },
      },
    })

    this.bikeLeatherMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0x97572b) },
        uAlStrength: { value: 0.4 },
        uDlStrength: { value: 0.6 },
        uLightDirection: { value: new THREE.Vector3(1.0, 0.9, 0.2) },
      },
    })

    this.bikeChromeMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0xc0c0c0) },
        uAlStrength: { value: 0.4 },
        uDlStrength: { value: 0.6 },
        uLightDirection: { value: new THREE.Vector3(1.0, 0.9, 0.2) },
      },
    })

    this.bikeBlackMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0x1b1212) },
        uAlStrength: { value: 0.4 },
        uDlStrength: { value: 0.6 },
        uLightDirection: { value: new THREE.Vector3(1.0, 0.9, 0.2) },
      },
    })

    this.car0RedMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0xf70000) },
        uAlStrength: { value: 0.7 },
        uDlStrength: { value: 0.6 },
        uLightDirection: { value: new THREE.Vector3(1.4, 3, 0.5) },
      },
    })

    this.car0GreyMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0x292625) },
        uAlStrength: { value: 1.2 },
        uDlStrength: { value: 0.8 },
        uLightDirection: { value: new THREE.Vector3(-1.5, 2.8, 0.5) },
      },
    })

    this.car0OrangeMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0xdc8713) },
        uAlStrength: { value: 1 },
        uDlStrength: { value: 0.25 },
        uLightDirection: { value: new THREE.Vector3(3, 1.2, 5) },
      },
    })

    this.car0WhiteMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0xa29c9f) },
        uAlStrength: { value: 0.9 },
        uDlStrength: { value: 0.1 },
        uLightDirection: { value: new THREE.Vector3(-2.17, -2.17, -1.2) },
      },
    })

    this.car1BlackMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0x292625) },
        uAlStrength: { value: 0.1 },
        uDlStrength: { value: 0.5 },
        uLightDirection: { value: new THREE.Vector3(-0.76, 2, -1.2) },
      },
    })

    this.car1WhiteMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0xffffff) },
        uAlStrength: { value: 0.8 },
        uDlStrength: { value: 0.1 },
        uLightDirection: { value: new THREE.Vector3(-0.76, 5, -1.2) },
      },
    })

    this.car1OrangeMaterial = new THREE.ShaderMaterial({
      vertexShader: toonVertexShader,
      fragmentShader: toonFragmentShader,
      uniforms: {
        uModelColor: { value: new THREE.Color(0xdc8713) },
        uAlStrength: { value: 0.9 },
        uDlStrength: { value: 0.4 },
        uLightDirection: { value: new THREE.Vector3(0.11, 4.35, 1.85) },
      },
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
        // console.log("Train animation started")
      },
    })
    gsap.to(this.crossingBarArm1.rotation, {
      z: Math.PI / 2,
      duration: 5,
      ease: "power2.inOut",
      delay: 2.5,
      onStart: () => {
        // console.log("Train animation started")
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

      this.bikeGreen = this.worldGroup.getObjectByName("BikeGreen")
      this.bikeGreen.material = this.bikeGreenMaterial

      this.bikeLeather = this.worldGroup.getObjectByName("BikeLeather")
      this.bikeLeather.material = this.bikeLeatherMaterial

      this.bikeChrome = this.worldGroup.getObjectByName("BikeChrome")
      this.bikeChrome.material = this.bikeChromeMaterial

      this.bikeBlack = this.worldGroup.getObjectByName("BikeBlack")
      this.bikeBlack.material = this.bikeBlackMaterial

      this.car0Red = this.worldGroup.getObjectByName("Car0Red")
      this.car0Red.material = this.car0RedMaterial

      this.car0Grey = this.worldGroup.getObjectByName("Car0Grey")
      this.car0Grey.material = this.car0GreyMaterial

      this.car0Orange = this.worldGroup.getObjectByName("Car0Orange")
      this.car0Orange.material = this.car0OrangeMaterial

      this.car0White = this.worldGroup.getObjectByName("Car0White")
      this.car0White.material = this.car0WhiteMaterial

      this.car1Black = this.worldGroup.getObjectByName("Car1Black")
      this.car1Black.material = this.car1BlackMaterial

      this.car1White = this.worldGroup.getObjectByName("Car1White")
      this.car1White.material = this.car1WhiteMaterial

      this.car1Orange = this.worldGroup.getObjectByName("Car1Orange")
      this.car1Orange.material = this.car1OrangeMaterial

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

  setTweaks() {
    pane.addInput(this.car1OrangeMaterial.uniforms.uAlStrength, "value", {
      min: 0,
      max: 1,
      step: 0.01,
    })
    pane.addInput(this.car1OrangeMaterial.uniforms.uDlStrength, "value", {
      min: 0,
      max: 1,
      step: 0.01,
    })

    pane.addInput(this.car1OrangeMaterial.uniforms.uLightDirection.value, "x", {
      min: -5,
      max: 5,
      step: 0.01,
    })

    pane.addInput(this.car1OrangeMaterial.uniforms.uLightDirection.value, "y", {
      min: -5,
      max: 5,
      step: 0.01,
    })

    pane.addInput(this.car1OrangeMaterial.uniforms.uLightDirection.value, "z", {
      min: -5,
      max: 5,
      step: 0.01,
    })
  }

  update(elapsedTime) {}
}
