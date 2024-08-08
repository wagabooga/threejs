import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
/**
 * consider adding antialiasing to help smooth pixelated lines
 * const renderer = new THREE.WebGLRenderer({ antialias: true })
 */
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

/**
 * setting size explicity, consider adding following to index.htmlto test
 * 
 *    <p>Some HTML Text</p>
    <canvas id="canvas"></canvas>
    <p>Some More HTML Text</p>

    remember to remove resize
 */
// const canvas = document.getElementById('canvas') as HTMLCanvasElement
// const renderer = new THREE.WebGLRenderer({ canvas: canvas })
// renderer.setSize(200, 200)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

animate()