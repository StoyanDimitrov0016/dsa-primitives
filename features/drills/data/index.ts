import { arrayDrills } from "./arrays";
import { drillGroups } from "./groups";
import { searchingDrills } from "./searching";
import { validateDrillCatalog } from "../lib/catalog-validation";

export { drillGroups } from "./groups";

export const drills = validateDrillCatalog({
  drillGroups,
  drills: [...searchingDrills, ...arrayDrills],
});

export const defaultDrill = drills[0];
