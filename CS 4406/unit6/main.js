  // Create the scene
  const scene = new THREE.Scene();

  // Set up the camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;

  // Set up the renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Load the Earth texture
  const earthTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/300px-The_Earth_seen_from_Apollo_17.jpg');
  
  // Create Earth geometry and material
  const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
  const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  // Load the Moon texture
  const moonTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg');
  
  // Create Moon geometry and material
  const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  
  // Position the Moon near the Earth
  moon.position.set(5, 0, 0);
  scene.add(moon);

  // Add a directional light to simulate sunlight
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 0, 0).normalize(); // Light source to the right of the Earth
  scene.add(light);

  // Add ambient light for subtle background lighting
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // Function to animate the Earth and Moon
  function animate() {
      requestAnimationFrame(animate);

      // Rotate the Earth on its axis
      earth.rotation.y += 0.001;

      // Rotate the Moon on its axis
      moon.rotation.y += 0.005;

      // Orbit the Moon around the Earth
      const time = Date.now() * 0.001;
      moon.position.x = 5 * Math.cos(time);
      moon.position.z = 5 * Math.sin(time);

      // Render the scene
      renderer.render(scene, camera);
  }

  // Start the animation
  animate();

  // Handle window resize
  window.addEventListener('resize', function () {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  });