/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'

import { cameraObject } from './cameraObject'
import { Model } from './Model'

import { debug } from './debug'

import 'animate.css';

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.createElement('div')
document.body.appendChild(container)

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()
scene.background = new THREE.Color('#c8f0f9')

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true}) // turn on antialias
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //set pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // make it full screen
renderer.outputEncoding = THREE.sRGBEncoding // set color encoding
container.appendChild(renderer.domElement) // add the renderer to html div


const camera1 = new cameraObject(scene, renderer)


/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE FULL SCREEN
window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    camera1.camera.aspect = width / height
    camera1.camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(2)
})


/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const ambient = new THREE.AmbientLight(0xa0a0fc, 0.82)
scene.add(ambient)

const sunLight = new THREE.DirectionalLight(0xe8c37b, 1.96)
sunLight.position.set(-69,44,14)
scene.add(sunLight)

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL 
Model(scene, 'models/gltf/starter-scene.glb')

camera1.moveCameraToPosition(16,50,-0.1,6500,1000);


/////////////////////////////////////////////////////////////////////////
//// HTML MENU functionality
document.getElementById("link1").onclick = function() {myFunction()};

function myFunction() {
  console.log("link 1 pressed")
  camera1.moveCameraToPosition(29,18,-39,500,0)
}


/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function rendeLoop() {

    TWEEN.update() // update animations

    camera1.controls.update() // update orbit controls

    renderer.render(scene, camera1.camera) // render the scene using the camera

    requestAnimationFrame(rendeLoop) //loop the render function
    
}

rendeLoop() //start rendering

debug(sunLight, ambient, scene, camera1.camera) // start debug