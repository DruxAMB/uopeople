// Import Three.js and OrbitControls
import * as THREE from './js/three.module.js';
import { OrbitControls } from './js/orbitcontrols.js';

// Create the scene
const scene = new THREE.Scene();

// Create a camera (perspective camera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);

// Create the WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth controls
controls.dampingFactor = 0.05;

// Create an axis helper
const axesHelper = new THREE.AxesHelper(2); // Axes size
scene.add(axesHelper);

// Create a grid plane
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// Function to create a mesh based on z = f(x, y)
const createFunctionGraph = (func, xMin, xMax, yMin, yMax, step) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    for (let x = xMin; x <= xMax; x += step) {
        for (let y = yMin; y <= yMax; y += step) {
            const z = func(x, y); // Apply the function z = f(x, y)
            vertices.push(x, y, z);
            colors.push((x - xMin) / (xMax - xMin), (y - yMin) / (yMax - yMin), 0.5); // Assign colors
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Create material and mesh
    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
};

// Define a mathematical function (e.g., z = x^2 + y^2, cone, paraboloid, etc.)
const exampleFunction = (x, y) => {
    return x * x - y * y; // A hyperbolic paraboloid
};

// Create the function graph mesh
createFunctionGraph(exampleFunction, -1, 1, -1, 1, 0.1);

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
};

// Handle resizing of the browser window
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start animation loop
animate();
