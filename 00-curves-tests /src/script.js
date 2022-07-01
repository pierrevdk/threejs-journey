import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

scene.add(new THREE.GridHelper(20, 40));

// Curve
const curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( -10, 1, 0 ),
    new THREE.Vector3( -5, -1, 0 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, 1, 0 ),
    new THREE.Vector3( 10, -1, 0 )
] );

var points = curve.getPoints( 50 );

var geometry = new THREE.BufferGeometry().setFromPoints( points );

var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
var curveObject = new THREE.Line( geometry, material );

scene.add( curveObject );

curveObject.curve = curve;

// Sizes
var sizes = {
    width: 800,
    height: 600
}

/**
 * Axes Helper
 */
 var axesHelper = new THREE.AxesHelper(5)
 scene.add(axesHelper)

// Camera
var camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height)
camera.position.z = 20
scene.add(camera)

// Renderer
var renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// // Clock
var clock = new THREE.Clock();
var time = 0;

render();

// function resize(renderer) {
//     const canvas = renderer.domElement;
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
//     const needResize = canvas.width !== width || canvas.height !== height;
//     if (needResize) {
//       renderer.setSize(width, height, false);
//     }
//     return needResize;
//   }

function render() {
    // if (resize(renderer)) {
    //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //   camera.updateProjectionMatrix();
    // }
    renderer.render(scene, camera);
  
    time += clock.getDelta();
  
    // curve.points[0].y = Math.sin(time) * 2.5;
    curve.points[0].y = Math.sin(time) * 2.5;
    // curve.points[2].y = Math.sin(time) * 2.5;
    // curve.points[3].y = Math.sin(time) * 2.5;
    // curve.points[4].y = Math.sin(time) * 2.5;

    curve.points[1].x = Math.cos(time) * 1;
  
    geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
  
    curveObject.geometry.dispose();
    curveObject.geometry = geometry;
  
  
    requestAnimationFrame(render);
  }

// const clock = new THREE.Clock()

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// gsap.to(curveObject.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(curveObject.position, { duration: 1, delay: 2, x: 0 })

// Animations
// const tick = () =>
// {
//     // // Clock
//     // const elapsedTime = clock.getElapsedTime()


//     // // Update objects
//     // camera.position.y = Math.sin(elapsedTime)
//     // camera.position.x = Math.cos(elapsedTime)
//     // camera.lookAt(mesh.position)

//     // Render
//     renderer.render(scene, camera)

//     window.requestAnimationFrame(tick)
// }

// tick()