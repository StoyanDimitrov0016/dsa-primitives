import { arrayDrills } from "./arrays";
import { drillGroups } from "./groups";
import { searchingDrills } from "./searching";
import { treeDrills } from "./trees";
import { validateDrillCatalog } from "../lib/catalog-validation";

export { drillGroups } from "./groups";

export const drills = validateDrillCatalog({
  drillGroups,
  drills: [...searchingDrills, ...arrayDrills, ...treeDrills],
});

export const defaultDrill = drills[0];
