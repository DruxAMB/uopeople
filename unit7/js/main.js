import * as THREE from './three.module.js';
import { OrbitControls } from './orbitcontrols.js';

// Create the scene
const scene = new THREE.Scene();

// Create the camera (perspective view)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer and attach it to the document
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls to rotate and zoom the graph
const controls = new OrbitControls(camera, renderer.domElement);

// Add an axis helper to indicate the x, y, z axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Create a plane for reference
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x555555,
    wireframe: true
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Function that returns z = f(x, y)
function functionToGraph(x, y) {
    // Example: z = x^2 + y^2 (creates a cone shape)
    return x * x + y * y;
}

// Create a geometry for the graph
const geometry = new THREE.BufferGeometry();
const vertices = [];

// Define the range for x and y and the step size
const min = -1, max = 1, step = 0.1;

for (let x = min; x <= max; x += step) {
    for (let y = min; y <= max; y += step) {
        const z = functionToGraph(x, y);
        vertices.push(x, y, z); // Store each vertex (x, y, z)
    }
}

// Set the vertices to the geometry
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

// Create a mesh material (with vertex colors)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

// Create the mesh for the graph and add it to the scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
