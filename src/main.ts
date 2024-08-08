import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'dat.gui';

// color
const sceneA = new THREE.Scene()
sceneA.background = new THREE.Color(0x123456)

// texture
const sceneB = new THREE.Scene()
sceneB.background = new THREE.TextureLoader().load('https://sbcode.net/img/grid.png')

// skybox
const sceneC = new THREE.Scene()
sceneC.background = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

// additional features
//sceneC.backgroundBlurriness = 0.5

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
// if you have multiple scenes, you have to manage their objects independently, you cant just share the same object across
sceneA.add(cube)
// sceneC.add(cube)


const stats = new Stats()
// adds stats canvas to dom
document.body.appendChild(stats.dom)

let activeScene = sceneA
const setScene = {
  sceneA: () => {
    activeScene = sceneA
  },
  sceneB: () => {
    activeScene = sceneB
  },
  sceneC: () => {
    activeScene = sceneC
  },
}

/**
 * See other gui's @ Useful Links
 * https://sbcode.net/threejs/dat-gui-module/
 */
const gui = new GUI()
gui.add(setScene, 'sceneA').name('Scene A')
gui.add(setScene, 'sceneB').name('Scene B')
gui.add(setScene, 'sceneC').name('Scene C')

// const cubeFolder = gui.addFolder('Cube')
// // GUI.add takes in a Eueler angle (radian) so we use Math.PI*2
// cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
// cubeFolder.open()

// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'z', 0, 20)
// cameraFolder.open()

function animate() {
  requestAnimationFrame(animate)

  /**
   * can use stats to measure only certain chunk of code
   *   stats.begin();
   *   cube.rotation.x += 0.01
   *   cube.rotation.y += 0.01
   *   stats.end();
   */


  renderer.render(activeScene, camera)
  stats.update()
}

animate()