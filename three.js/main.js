import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Búðu til scene
const scene = new THREE.Scene();

// Búðu til camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10); 
camera.lookAt(scene.position); 

// Búðu til renderer og stilltu upplausn
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Viðeigandi stillingar fyrir vafra
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Bættu við gólfflöt (grunnform) með MeshStandardMaterial
const geometry = new THREE.PlaneGeometry(10, 10);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./basketball-ball.jpg'); 
const material = new THREE.MeshStandardMaterial({ map: texture });
const floor = new THREE.Mesh(geometry, material);
floor.rotation.x = -Math.PI / 2; 
scene.add(floor);

// Bættu við Directional Lighting og Ambient Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0); 
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Bættu við Orbit control
const controls = new OrbitControls(camera, renderer.domElement);

// Initialize GLTFLoader
const loader = new GLTFLoader();

// Load GLTF model
loader.load(
    './ball.glb',
    function (gltf) {
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
