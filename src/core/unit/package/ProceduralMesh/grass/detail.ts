import {
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/mirage-x/unit/common";

const detail = {
  code: "ProceduralMesh/grass",
  propsConfig: {
    name: UnitProp.String("Empty"),
    position: UnitProp.Float3([0, 0, 0]),
    scale: UnitProp.Float3([1, 1, 1]),
    rotation: UnitProp.Float3([0, 0, 0]),
    styledSprite: UnitProp.Uri(""),
    styledColor: UnitProp.String(""),
    styledMaterial: UnitProp.String(""),
  },
  children: "multi" as const,
};

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
