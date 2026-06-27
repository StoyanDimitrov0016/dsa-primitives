import type { Drill, DrillGroup } from "../types";

type ValidateDrillCatalogInput = {
  drillGroups: DrillGroup[];
  drills: Drill[];
};

function assertCatalog(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Invalid drill catalog: ${message}`);
  }
}

export function validateDrillCatalog({ drillGroups, drills }: ValidateDrillCatalogInput) {
  assertCatalog(drillGroups.length > 0, "at least one group is required");
  assertCatalog(drills.length > 0, "at least one drill is required");

  const groupIds = new Set<string>();
  const drillIds = new Set<string>();
  const routeIds = new Set<string>();

  for (const group of drillGroups) {
    assertCatalog(group.id.trim().length > 0, "group id is required");
    assertCatalog(!groupIds.has(group.id), `duplicate group id "${group.id}"`);
    groupIds.add(group.id);
  }

  for (const drill of drills) {
    const routeId = `${drill.groupId}/${drill.id}`;

    assertCatalog(drill.id.trim().length > 0, "drill id is required");
    assertCatalog(!drillIds.has(drill.id), `duplicate drill id "${drill.id}"`);
    assertCatalog(!routeIds.has(routeId), `duplicate drill route "${routeId}"`);
    assertCatalog(groupIds.has(drill.groupId), `missing group "${drill.groupId}"`);
    assertCatalog(
      drill.functionName.trim().length > 0,
      `function name is required for "${drill.id}"`
    );
    assertCatalog(
      drill.starterCode.includes(drill.functionName),
      `starter code for "${drill.id}" must include "${drill.functionName}"`
    );
    assertCatalog(
      drill.visibleCases.length > 0,
      `at least one visible case is required for "${drill.id}"`
    );
    assertCatalog(
      drill.hiddenCases.length > 0,
      `at least one hidden case is required for "${drill.id}"`
    );

    drillIds.add(drill.id);
    routeIds.add(routeId);
  }

  return drills;
}
