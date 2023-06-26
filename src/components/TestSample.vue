<template>
  <div ref='canvas' class="canvas">
  </div>
</template>

<script>
import * as THREE from 'three';
import * as Ammo from 'ammo';
export default {
  name: 'CubeCanvas',
  data: function () {
// Set up the scene
var scene = new THREE.Scene();

// Set up the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, -30);

// Set up the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights to the scene
var light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.7);
scene.add(light);

// Render the scene
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

function createLane(position) {
    // Create the lane geometry
    var laneWidth = 2;
    var laneHeight = 10;
    var laneDepth = 10;
    var laneColor = 0xff0000;
    var laneGeometry = new THREE.BoxGeometry(laneWidth, laneHeight, laneDepth);
    var laneMaterial = new THREE.MeshPhongMaterial({ color: laneColor });

    // Create the lane mesh
    var laneMesh = new THREE.Mesh(laneGeometry, laneMaterial);
    laneMesh.position.copy(position);
    scene.add(laneMesh);
}

// Add the lanes to the scene
createLane(new THREE.Vector3(0, 0, 0)); // Adjust the position as needed

function createBall() {
    // Create the ball geometry
    var ballRadius = 1;
    var ballColor = 0x00ff00;
    var ballGeometry = new THREE.SphereGeometry(ballRadius);
    var ballMaterial = new THREE.MeshPhongMaterial({ color: ballColor });

    // Create the ball mesh
    var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
    ballMesh.position.y = ballRadius;
    scene.add(ballMesh);

    // Create the ball physics
    var ballPhysics = new Ammo.btSphereShape(ballRadius);
    var ballTransform = new Ammo.btTransform();
    ballTransform.setIdentity();
    ballTransform.setOrigin(new Ammo.btVector3(0, 0, 0));
    var ballInertia = new Ammo.btVector3(0, 0, 0);
    var ballMotionState = new Ammo.btVector3(0, 0, 0);
    var ballRigidBodyInfo = new Ammo.btRigidBodyConstructionInfo(1, ballMotionState, ballPhysics, ballInertia);
    var ballRigidBody = new Ammo.btRigidBody(ballRigidBodyInfo);
    //scene.userData.physicsWorld.addRigidBody(ballRigidBody);

    // Add an input event listener to throw the ball
    document.addEventListener('pointerdown', function () {

        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.multiplyScalar(10);
        ballRigidBody.setLinearVelocity(new Ammo.btVector3(direction.x, direction.y, direction.z));
    });
}
createBall();
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas {
  width: 1000px;
  margin: auto;
}
</style>
