import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            character.scale.set(1, 1, 1); // Use original scale
            await renderer.compileAsync(character, camera, scene);

            // Debug: Log all mesh names to find duplicates
            console.log("Character model meshes:");
            const meshNames: string[] = [];
            character.traverse((child: any) => {
              if (child.isMesh) {
                meshNames.push(child.name);
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            console.log(meshNames);

            // Fix for duplicate hands issue by directly modifying the material
            character.traverse((child: any) => {
              if (child.isMesh) {
                // Log all mesh names for debugging
                console.log(`Mesh: ${child.name}`);

                // More aggressive approach to hide duplicate parts
                // Hide any mesh with .001 in the name as these are likely duplicates
                if (child.name.includes('.001')) {
                  console.log(`Hiding duplicate part: ${child.name}`);

                  // Make the duplicate parts invisible by setting their material's opacity to 0
                  if (child.material) {
                    if (Array.isArray(child.material)) {
                      child.material.forEach((mat: THREE.Material) => {
                        mat.transparent = true;
                        mat.opacity = 0;
                        mat.visible = false;
                      });
                    } else {
                      child.material.transparent = true;
                      child.material.opacity = 0;
                      child.material.visible = false;
                    }
                  }

                  // Also set the mesh itself to invisible
                  child.visible = false;
                }
              }
            });

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
