# Three.js Journey

## 03. First Three.js Project

We need 4 elements for a basic scene:

**A scene**

- Like a container in which we can put everything like objects, models, particles, lights, etc.

```js
const scene = new THREE.Scene()
```

**Objects**

- Can be many things like primitive geometries, imported models, particles, lights, etc.
- We need to create a Mesh which is a combination of a geometry (the shape) and a material (the appearance).

```js
const geometry = new THREE.BoxGeometry(1, 1, 1) // A cube
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // A red material
```

- There are many geometries available in Three.js, such as BoxGeometry, SphereGeometry, PlaneGeometry, etc.
- Also, there are many ways to specify a color in Three.js, such as hexadecimal values, RGB values, or using textures.

```js
const mesh = new THREE.Mesh(geometry, material)
```

- We can add the mesh to the scene:

```js
scene.add(mesh)
```

**A camera**

- A camera is like a lens through which we view the scene.
- It is a theoretical point of view used when rendering the scene.
- We can have multiple cameras, but we usually only use one at a time.
- A camera can have different settings like position, field of view, aspect ratio, near and far clipping planes and different types like PerspectiveCamera or OrthographicCamera.

```js
const camera = new THREE.PerspectiveCamera()
```

- We are using a PerspectiveCamera which simulates the way we see the world with a perspective effect (objects further away appear smaller).
- The PerspectiveCamera takes parameters like field of view (FOV), aspect ratio, near and far clipping planes.
- The field of view is the vertical angle of the camera, how large your vision angle is, expressed in degrees and corresponds to the vertical vision angle.
- The aspect ratio is the ratio of the width to the height of the camera view, the width of the canvas divided by its height.

```js
const sizes = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
```

- Adding the camera to the scene is not necessary, but it is a good practice to keep track of it.

```js
scene.add(camera)
```

**A renderer**

- A renderer is responsible for rendering the scene and camera into a canvas element.
- The renderer will render the scene from the camera's point of view.
- The result will be drawn on the canvas element.
- We can create the canvas, or let the renderer create it and then add it to the DOM.
- We will add the canvas ourself to the DOM, so we can control its size and position.

```html
<canvas class="webgl"></canvas>
```

```js
const canvas = document.querySelector('canvas.webgl')
```

- We can create a WebGLRenderer which is the most common renderer used in Three.js.

```js
const renderer = new THREE.WebGLRenderer({
  canvas,
})
```

- We can set the size of the renderer to match the size of the canvas.

```js
renderer.setSize(sizes.width, sizes.height)
```

- Finally, we can render the scene from the camera's point of view.

```js
renderer.render(scene, camera)
```

- Oops, we see a black screen! This is because we need to set the camera position so that it can see the mesh we created.
- We can transform objects using the position, rotation, and scale properties of the camera object.
- We are going to use the position property to move the camera backwards so that it can see the mesh. (We can either move the camera or the mesh, but moving the camera is more common.)
- The position is an object (Vector3) with three relevant properties: x, y, and z. By, default, Three.js considers the forward/backward axis to be the z-axis, so we will move the camera backwards along the z-axis.

```js
camera.position.z = 5
```

**Full code example:**

```js
import * as THREE from 'three'

// Create a scene
const scene = new THREE.Scene()

// Create a geometry and a material
const geometry = new THREE.BoxGeometry(1, 1, 1) // A cube
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }) // A red material
// Create a mesh with the geometry and material
const mesh = new THREE.Mesh(geometry, material)
// Add the mesh to the scene
scene.add(mesh)
// Create a camera
const sizes = {
  width: 800,
  height: 600,
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// Set the camera position
camera.position.z = 5
// Add the camera to the scene
scene.add(camera)
// Create a renderer
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
})
// Set the size of the renderer
renderer.setSize(sizes.width, sizes.height)
// Render the scene from the camera's point of view
renderer.render(scene, camera)
```
