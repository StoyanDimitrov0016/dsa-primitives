import { arrayDrills } from "./groups/arrays";
import { drillGroups as authoredDrillGroups } from "./groups/groups";
import { searchingDrills } from "./groups/searching";
import { slidingWindowDrills } from "./groups/sliding-window";
import { treeDrills } from "./groups/trees";
import { DrillGroupSchema, DrillSchema } from "./schemas";
import type { Drill, DrillGroup } from "./types";
import { hasCustomValidator } from "./validators";

type ValidateCatalogInput = {
  drillGroups: DrillGroup[];
  drills: Drill[];
};

function assertCatalog(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Invalid drill catalog: ${message}`);
  }
}

export function validateCatalog({ drillGroups, drills }: ValidateCatalogInput) {
  const parsedGroups = drillGroups.map((group) => DrillGroupSchema.parse(group));
  const parsedDrills = drills.map((drill) => DrillSchema.parse(drill));

  assertCatalog(parsedGroups.length > 0, "at least one group is required");
  assertCatalog(parsedDrills.length > 0, "at least one drill is required");

  const groupIds = new Set<string>();
  const drillIds = new Set<string>();
  const routeIds = new Set<string>();

  for (const group of parsedGroups) {
    assertCatalog(!groupIds.has(group.id), `duplicate group id "${group.id}"`);
    groupIds.add(group.id);
  }

  for (const drill of parsedDrills) {
    const routeId = `${drill.groupId}/${drill.id}`;

    assertCatalog(!drillIds.has(drill.id), `duplicate drill id "${drill.id}"`);
    assertCatalog(!routeIds.has(routeId), `duplicate drill route "${routeId}"`);
    assertCatalog(groupIds.has(drill.groupId), `missing group "${drill.groupId}"`);
    assertCatalog(
      drill.starterCode.includes(drill.contract.functionName),
      `starter code for "${drill.id}" must include "${drill.contract.functionName}"`
    );
    assertCatalog(
      drill.assertion?.comparison !== "custom" ||
        Boolean(drill.assertion.validatorName && hasCustomValidator(drill.assertion.validatorName)),
      `custom validator for "${drill.id}" is missing or unknown`
    );

    drillIds.add(drill.id);
    routeIds.add(routeId);
  }

  return {
    drillGroups: parsedGroups,
    drills: parsedDrills,
  };
}

const catalog = validateCatalog({
  drillGroups: authoredDrillGroups,
  drills: [...searchingDrills, ...arrayDrills, ...slidingWindowDrills, ...treeDrills],
});

export const drillRepository = {
  getGroups() {
    return catalog.drillGroups;
  },
  getDrills() {
    return catalog.drills;
  },
  getDefaultDrill() {
    return catalog.drills[0];
  },
  getDrillsByGroup() {
    return catalog.drillGroups.reduce<Record<string, Drill[]>>((groups, group) => {
      groups[group.id] = catalog.drills.filter((drill) => drill.groupId === group.id);
      return groups;
    }, {});
  },
  getDrillByRoute(groupId: string, drillId: string) {
    return catalog.drills.find((drill) => drill.groupId === groupId && drill.id === drillId);
  },
};

export const drillGroups = drillRepository.getGroups();
export const drills = drillRepository.getDrills();
export const defaultDrill = drillRepository.getDefaultDrill();
export const drillsByGroup = drillRepository.getDrillsByGroup();
export const getDrillByRoute = drillRepository.getDrillByRoute;
