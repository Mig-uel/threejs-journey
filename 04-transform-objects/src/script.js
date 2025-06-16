import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Axes Helper
const axesHelper = new THREE.AxesHelper(1)

// Scene
const scene = new THREE.Scene()
scene.add(axesHelper)

/**
 * Objects
 */
const group = new THREE.Group()
scene.add(group)

// Cubes
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  })
)
cube2.position.x = -2

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  })
)
cube3.position.x = 2

group.add(cube1, cube2, cube3)
group.scale.y = 2

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
