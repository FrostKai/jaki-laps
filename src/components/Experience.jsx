import { PerspectiveCamera, Environment } from "@react-three/drei";
import CommandCenter from "./environment/CommandCenter";
import AICore from "./ai-core/AICore";
import CameraRig from "./camera/CameraRig";

const Experience = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 4, 15]}
        fov={45}
      />

      <CameraRig />

      <color attach="background" args={["#050816"]} />

      <CommandCenter />

      <AICore />

      <Environment preset="night" />
    </>
  );
};

export default Experience;