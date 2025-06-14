import * as THREE from 'three'

// Query for canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Material
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)

// Add the mesh to the scene
scene.add(mesh)

// Sizes for the camera
const sizes = {
  fov: 75,
  width: 800,
  height: 600,
}

// Camera (also an object)
const camera = new THREE.PerspectiveCamera(
  sizes.fov,
  sizes.width / sizes.height
)
camera.position.z = 3

scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})

// Resize the renderer/canvas
renderer.setSize(sizes.width, sizes.height)

// Finally, render the scene and camera
renderer.render(scene, camera)
