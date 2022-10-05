import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


class cameraObject {

    constructor(scene, renderer) {
        /////////////////////////////////////////////////////////////////////////
        ///// CAMERAS CONFIG
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 100)
        this.camera.position.set(34,16,-20)
        scene.add(this.camera)

        /////////////////////////////////////////////////////////////////////////
        ///// CREATE ORBIT CONTROLS
        this.controls = new OrbitControls(this.camera, renderer.domElement)

        console.log(this.controls)
    }

    /////////////////////////////////////////////////////////////////////////
    //// INTRO CAMERA ANIMATION USING TWEEN
    introAnimation() {
        var controls = this.controls
        
        controls.enabled = false //disable orbit controls to animate the camera
    
        new TWEEN.Tween(this.camera.position.set(26,4,-35 )).to({ // from camera position
            x: 16, //desired x position to go
            y: 50, //desired y position to go
            z: -0.1 //desired z position to go
        }, 6500) // time take to animate
        .delay(1000).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls

            controls.enableDamping = true
            controls.dampingFactor = 0.04
            controls.minDistance = 35
            controls.maxDistance = 60
            controls.enableRotate = true
            controls.enableZoom = true
            controls.maxPolarAngle = Math.PI /2.5

            TWEEN.remove(this) // remove the animation from memory
        })
    }


    testmethod() { console.log("test method")}



    moveCameraToPosition(x,y,z, timeToAnimate, delay) {
        var controls = this.controls
        
        controls.enabled = false //disable orbit controls to animate the camera
        
        new TWEEN.Tween(this.camera.position).to({ // from camera position
            x: x, //desired x position to go
            y: y, //desired y position to go
            z: z //desired z position to go
        }, timeToAnimate) // time take to animate
        .delay(delay).easing(TWEEN.Easing.Quartic.InOut).start() // define delay, easing
        .onComplete(function () { //on finish animation
            controls.enabled = true //enable orbit controls
           
            controls.enableDamping = true
            controls.dampingFactor = 0.04
            controls.minDistance = 35
            controls.maxDistance = 60
            controls.enableRotate = true
            controls.enableZoom = true
            controls.maxPolarAngle = Math.PI /2.5
           
            TWEEN.remove(this) // remove the animation from memory
        })
        
    }




}


export {cameraObject};

