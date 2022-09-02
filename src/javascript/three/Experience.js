import * as THREE from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"

import defaultVertexShader from "../../shaders/default/vertex.glsl?raw"
import defaultFragmentShader from "../../shaders/default/fragment.glsl?raw"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const loaders = new Loaders()

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.ShaderMaterial({
    vertexShader: defaultVertexShader,
    fragmentShader: defaultFragmentShader,
    side: THREE.DoubleSide,
    transparent: true,

    uniforms: {
      uTexture: { value: loaders.textureLoader.load("/images/Duck.jpg") }
    }
  })

)
scene.add(plane)

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()
let time = Date.now()

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  window.requestAnimationFrame(tick)

  stats.end()
}

tick()
