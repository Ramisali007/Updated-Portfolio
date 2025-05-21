import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();

// Restore all original textures
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

// Restore original sphere geometry for better visual quality
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

// Restore original number of spheres
const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  // Optimize frame updates with throttling
  const frameCount = useRef(0);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;

    // Only update every 3 frames for better performance
    frameCount.current = (frameCount.current + 1) % 3;
    if (frameCount.current !== 0) return;

    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current.translation())
      .normalize()
      .multiplyScalar(-50 * delta * scale); // Simplified calculation

    api.current.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);
  const frameCount = useRef(0);
  const targetPosition = useRef(new THREE.Vector3(100, 100, 100));

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;

    // Only update every 2 frames for better performance
    frameCount.current = (frameCount.current + 1) % 2;
    if (frameCount.current !== 0) return;

    // Calculate target position
    targetPosition.current.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    // Smooth movement
    vec.lerp(targetPosition.current, 0.15);
    ref.current.setNextKinematicTranslation(vec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  // Load textures
  const textures = useMemo(() => {
    return imageUrls.map((url) => textureLoader.load(url));
  }, []);

  useEffect(() => {
    // Throttle scroll event for better performance
    let scrollTimeout: number;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;

        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          const techStackElement = document.querySelector(".techstack");

          if (techStackElement) {
            const techStackPosition = techStackElement.getBoundingClientRect().top;
            // Only activate when the tech stack is in view
            setIsActive(
              techStackPosition < window.innerHeight * 0.75 &&
              techStackPosition > -window.innerHeight * 0.5
            );
          }

          isScrolling = false;
        });
      }
    };

    // Handle navigation clicks more efficiently
    const handleNavClick = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = window.setTimeout(handleScroll, 100);
    };

    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", handleNavClick);
    });

    // Initial check
    handleScroll();

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener("scroll", handleScroll);
      document.querySelectorAll(".header a").forEach((elem) => {
        const element = elem as HTMLAnchorElement;
        element.removeEventListener("click", handleNavClick);
      });
    };
  }, []);
  // Restore original material properties for better visual appearance
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" id="techstack">
      <h2>My Techstack</h2>

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          alpha: true,
          stencil: false,
          depth: false,
          antialias: true
        }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.5;
        }}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[i % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        {isActive && (
          <Environment
            files="/models/char_enviorment.hdr"
            environmentIntensity={0.5}
            environmentRotation={[0, 4, 2]}
            preset="warehouse"
          />
        )}
        <EffectComposer>
          <N8AO color="white" aoRadius={1} intensity={1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
