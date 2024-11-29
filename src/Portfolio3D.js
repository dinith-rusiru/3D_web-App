import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './Portfolio3D.css'; // We'll create this CSS file next

function Portfolio3D() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create project cubes
    const createProjectCube = (color, position, label) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(...position);
      cube.userData = { label }; // Store project label
      return cube;
    };

    const projects = [
      createProjectCube(0xff6347, [-2, 2, 0], "Web Development"),
      createProjectCube(0x4169E1, [0, 2, 0], "Mobile App"),
      createProjectCube(0x32CD32, [2, 2, 0], "Data Science"),
      createProjectCube(0x9400D3, [-2, 0, 0], "UI/UX Design"),
      createProjectCube(0xFFD700, [0, 0, 0], "Machine Learning"),
      createProjectCube(0x00CED1, [2, 0, 0], "Blockchain")
    ];

    projects.forEach(project => scene.add(project));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse move event for camera rotation
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({
        x: (clientX / window.innerWidth) * 2 - 1,
        y: -(clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate project cubes
      projects.forEach(project => {
        project.rotation.x += 0.01;
        project.rotation.y += 0.01;
      });

      // Camera rotation based on mouse position
      camera.position.x = mousePosition.x * 2;
      camera.position.y = mousePosition.y * 2;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Responsive handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="portfolio-3d-container">
      <canvas 
        ref={canvasRef} 
        className="portfolio-canvas"
      />
      <div className="portfolio-overlay">
        <h1>My 3D Portfolio</h1>
        <p>Move your mouse to interact with the scene!</p>
      </div>
    </div>
  );
}

export default Portfolio3D;