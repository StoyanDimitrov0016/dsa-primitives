import { drills } from "./data";

export function getDrillByRoute(groupId: string, drillId: string) {
  return drills.find((drill) => drill.groupId === groupId && drill.id === drillId);
}
