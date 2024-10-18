import { Slot } from "../unit/package/Primitive/main";
import { BoxMesh, Grass } from "../unit/package/ProceduralMesh/main";

// Code Generated with love

const createWall = (
  scale: [number, number, number],
  position: [number, number, number]
) => (
  <BoxMesh
    scale={scale}
    rotation={[0, 0, 0]}
    position={position}
    styledSprite={SpriteThing}
  />
);
const wall_height = 4;
const SpriteThing = "";

const getRandomOffset = (limit: number) => (Math.random() - 0.5) * 2 * limit;

const create_random_grass_floor = (
  density: number,
  scale: [number, number, number],
  position: [number, number, number],
  offsetLimit: number
) => {
  const grassElements = [];
  for (let i = 0; i < density; i++) {
    for (let j = 0; j < density; j++) {
      const offsetX = getRandomOffset(offsetLimit);
      const offsetZ = getRandomOffset(offsetLimit);
      grassElements.push(
        <Grass
          key={`${i}-${j}`}
          scale={scale}
          rotation={[0, 0, 0]}
          position={[i + offsetX, 0, j + offsetZ]}
          styledSprite={SpriteThing}
        />
      );
    }
  }
  return <>{grassElements}</>;
};
export const App = () => {
  return (
    <Slot name="Main">
      <BoxMesh
        scale={[50, 0.1, 50]}
        rotation={[0, 0, 0]}
        position={[0, -0.1, 0]}
        styledSprite={SpriteThing}
      />
      <Slot name="walls">
        {createWall([0.2, wall_height, 50], [25, wall_height / 2, 0])}
        {createWall([0.2, wall_height, 50], [-25, wall_height / 2, 0])}
        {createWall([50, wall_height, 0.2], [0, wall_height / 2, 25])}
        {createWall([50, wall_height, 0.2], [0, wall_height / 2, -25])}
      </Slot>
      <Slot name="ceiling">
        {/* <BoxMesh scale={[50, 0.1, 50]} rotation={[0, 0, 0]} position={[0, wall_height, 0]} styledSprite={SpriteThing}/> */}
      </Slot>
      <Slot name="floor">
        {create_random_grass_floor(5, [1, 1, 1], [0, 0, 5], 0.5)}
      </Slot>
    </Slot>
  );
};
