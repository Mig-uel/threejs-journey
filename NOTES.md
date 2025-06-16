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

---

## 04. Transform Objects

There are four properties that we can use to transform objects in Three.js:

**Position**: The position of the object in the 3D space.

**Scale**: The size of the object in the 3D space.

**Rotation**: The rotation of the object in the 3D space.

**Quaternion**: A quaternion is a mathematical representation of rotation that avoids gimbal lock and provides smooth interpolation between rotations.

- Quaternion is like a rotation in 3D space

All classes that inherit from the `Object3D` possess properties like `PerspectiveCamera`, `Mesh`, `Group`, etc.

You can see the inheritance on the [Three.js documentation](https://threejs.org/docs/index.html#api/en/core/Object3D).

Every object, every class that inherits from `Object3D` has the properties `position`, `scale`, `rotation`, and `quaternion`. These properties help us to transform objects in the 3D space.

These properties will be compiled in matrices that will be used to render the objects in the scene. You don't need to worry about the matrices, but it's good to know that they exist and are used under the hood.

<sub>Matrices are mathematical representations of transformations in 3D space. They are used to apply transformations like translation, rotation, and scaling to objects in the scene. In Three.js, matrices are automatically calculated and applied when you change the position, rotation, or scale of an object.
</sub>

### Moving Objects

With the `position` property, we can move objects in the 3D space. The `position` property is a `Vector3` object that has three properties: `x`, `y`, and `z`.

```js
mesh.position.x = 1 // Move the mesh 1 unit to the right
mesh.position.y = 2 // Move the mesh 2 units up
mesh.position.z = 3 // Move the mesh 3 units forward
```

- The `position` property is relative to the object's parent. If the object has no parent, it is relative to the scene.

The direction of each axis is arbitrary. In Three.js, we consider the following:

- The **x-axis** is the horizontal axis, pointing to the right.
- The **y-axis** is the vertical axis, pointing up.
- The **z-axis** is the depth axis, pointing backward.

The distance of `1` unit is arbitrary, but it is usually considered as `1 meter` in the Three.js world.

You should think of `1` unit according to what you are trying to represent in your scene. For example, if you are creating a scene with buildings, `1` unit could represent `1 meter`, but if you are creating a scene with small objects like coins, `1` unit could represent `1 centimeter`.

You are able to change the `position` of the mesh almost anywhere in the code, but it is a good practice to do it after you have created the mesh and added it to the scene.

Remember, `position` inherits from `Vector3`, which has many useful methods. For example, you can get the length of the vector, normalize it, or add another vector to it.

```js
mesh.position.set(1, 2, 3) // Set the position of the mesh to (1, 2, 3)
mesh.position.add(new THREE.Vector3(1, 2, 3)) // Add a vector to the position of the mesh
mesh.position.normalize() // Normalize the position of the mesh
mesh.position.length() // Get the length of the position vector
```

<sub>A `Vector3` is a mathematical representation of a point in 3D space. It has three properties: `x`, `y`, and `z`. You can use it to represent positions, directions, and velocities in 3D space. In Three.js, many objects inherit from `Vector3`, such as `Position`, `Scale`, and `Rotation`.
</sub>

### Axes Helper

Positioning objects in 3D space can be tricky, especially when you are starting. To help you visualize the axes, Three.js provides an `AxesHelper` class that draws three lines representing the x, y, and z axes.

```js
const axesHelper = new THREE.AxesHelper(1) // 1 is the size of the axes
scene.add(axesHelper) // Add the axes helper to the scene
```

- The `AxesHelper` takes a size parameter that determines the length of the axes. The default size is `1`, but you can change it to any value you want.
- The x-axis is red, the y-axis is green, and the z-axis is blue.
- The `AxesHelper` is a useful tool to visualize the axes and understand how the objects are positioned in the 3D space.
- You can remove the `AxesHelper` from the scene when you don't need it anymore, as it is only a visual aid.

```js
scene.remove(axesHelper) // Remove the axes helper from the scene
```

### Scaling Objects

Scaling objects in Three.js is done using the `scale` property. The `scale` property is also a `Vector3` object that has three properties: `x`, `y`, and `z`.

```js
mesh.scale.set(1, 1, 1) // Set the scale of the mesh to (1, 1, 1)
mesh.scale.x = 2 // Scale the mesh 2x in the x direction
mesh.scale.y = 3 // Scale the mesh 3x in the y direction
mesh.scale.z = 4 // Scale the mesh 4x in the z direction
```

- The default value of each axis is `1`, which means the object is not scaled.
- If you set the scale to `2`, the object will be twice as large in that direction. If you set it to `0.5`, the object will be half as large in that direction.

### Rotating Objects

Rotating objects in Three.js can be done using the `rotation` property or with a `Quaternion`.

Updating one of these properties will automatically update the other, so you can use either one depending on your needs.

#### Using the Rotation Property

The `rotation` property is a `Euler` object that has three properties: `x`, `y`, and `z`. These properties represent the rotation of the object in radians.

<sub>Euler angles are a way to represent rotations in 3D space using three angles, one for each axis (x, y, z). They are intuitive and easy to understand, but they can suffer from gimbal lock, which is a situation where two rotation axes become aligned and you lose a degree of freedom.
</sub>

```js
mesh.rotation.set(Math.PI / 2, 0, 0) // Rotate the mesh 90 degrees around the x-axis
mesh.rotation.x = Math.PI / 4 // Rotate the mesh 45 degrees around the x-axis
mesh.rotation.y = Math.PI / 6 // Rotate the mesh 30 degrees around the y-axis
mesh.rotation.z = Math.PI / 3 // Rotate the mesh 60 degrees around the z-axis
```

<sub>Radians are a unit of measurement for angles. One full rotation (360 degrees) is equal to 2π radians. In Three.js, angles are usually represented in radians, so you need to convert degrees to radians when setting the rotation.
</sub>

- When you change the `x`, `y`, or `z` properties of the `rotation`, you can imagine putting a stick through your object's center in the axis's direction and then rotating that object on that stick.
- Be careful with the order of the rotations, as they can affect the final orientation of the object. The order of rotations is important because it determines how the rotations are applied to the object.
- The default order of rotations in Three.js is `XYZ`, which means that the rotation around the x-axis is applied first, then the y-axis, and finally the z-axis. You can change the order of rotations by setting the `order` property of the `rotation` object.

```js
mesh.rotation.order = 'YXZ' // Change the rotation order to YXZ
```

- Gimbal lock is a situation where you have an axis that gets locked and you can no longer rotate around that axis. This can happen when using Euler angles for rotation, as the rotations are applied in a specific order. To avoid gimbal lock, you can use quaternions for rotation, which do not suffer from this issue.

#### Using Quaternions

Euler angles are easy to understand and use, but they can be problematic when it comes to complex rotations. This is why most 3D engines, including Three.js, use quaternions for rotation.

A quaternion also expresses a rotation but in a more mathematically stable way. It is a four-dimensional vector that can represent a rotation in 3D space without suffering from gimbal lock.

```js
mesh.quaternion.set(0, 0, 0, 1) // Set the quaternion to no rotation
mesh.quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0)) // Set the quaternion from an Euler angle
```

- The `setFromEuler` method converts an Euler angle to a quaternion.

### Scene Graph

Sometimes you will create complex objects. Imagine you are creating a house with walls, windows, bushes, and a roof. Towards the end, you realize that its too small, so you want to scale the whole house up. If you have all the parts of the house as separate objects, you will have to scale each one individually. This is where the scene graph comes in handy.

What you can do is create a scene graph, which is a group of objects that are treated as a single object. You can create a `Group` object and add all the parts of the house to it. Then, you can scale the group instead of each individual part.

- You can put objects inside groups and use `position`, `rotation`, and `scale` on the group. This will apply the transformations to all the objects inside the group.

```js
const group = new THREE.Group() // Create a group
group.add(mesh) // Add the mesh to the group
group.position.set(1, 2, 3) // Set the position of the group
group.scale.set(2, 2, 2) // Scale the group
scene.add(group) // Add the group to the scene
```

- The group will now have the position and scale applied to it, and all the objects inside the group will inherit those transformations.
