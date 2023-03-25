import * as THREE from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"

import defaultVertexShader from "../../shaders/default/vertex.glsl?raw"
import defaultFragmentShader from "../../shaders/default/fragment.glsl?raw"
import { TextureLoaderManager } from "./TextureLoaderManager"
import { World } from "./World"
import { Pane } from "tweakpane"
import { LoadingScreen } from "./LoadingScreen"

console.log("OI WHAT ARE YOU DOING HERE")

// const stats = new Stats()
// stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom)

export const pane = new Pane()
pane.hidden = true

export const loadingScreen = new LoadingScreen()

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()
// scene.background = new THREE.Color("white")

export const loaders = new Loaders()

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

export const textureLoaderManager = new TextureLoaderManager()

const al = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(al)

const pl = new THREE.PointLight("#fff", 0.4)
pl.position.set(10, 10, 20)
scene.add(pl)

export const world = new World()

// const carTexture = loaders.textureLoader.load("/textures/carBake.png")
// // carTexture.flipY = false
// carTexture.encoding = THREE.sRGBEncoding
// carTexture.anisotropy = renderer.renderer.capabilities.getMaxAnisotropy()

// const car = new THREE.Mesh(
//   new THREE.PlaneGeometry(304, 187),
//   new THREE.MeshBasicMaterial({ map: carTexture, transparent: true })
// )
// car.position.set(0, 2, 0)
// car.scale.set(0.01, 0.01, 0.01)
// scene.add(car)

//Animate
const clock = new THREE.Clock()
let time = Date.now()

const tick = () => {
  // stats.begin()

  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  // Update controls
  // camera.controls.update()
  camera.update()

  // Update world
  world.update(elapsedTime)

  // Render
  renderer.renderer.render(scene, camera.camera)

  window.requestAnimationFrame(tick)

  // stats.end()
}

tick()
