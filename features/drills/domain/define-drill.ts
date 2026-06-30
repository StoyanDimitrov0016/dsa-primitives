import { DrillGroupSchema, DrillSchema } from "./schemas";
import { drillImplementations } from "./implementations";
import type {
  Drill,
  DrillAssertion,
  DrillCase,
  DrillContract,
  DrillGroup,
  DrillLessonBlock,
} from "./types";

type DefineDrillGroupInput = DrillGroup;

type DefineDrillInput = Drill;

type DefineFunctionDrillInput = {
  id: string;
  groupId: string;
  title: string;
  category: string;
  summary: string;
  prompt: string;
  lesson: DrillLessonBlock[];
  implementation?: string;
  contract: DrillContract;
  assertion?: DrillAssertion;
  starterCode?: string;
  visible: DrillCase[];
  hidden: DrillCase[];
};

function getValueJsDocType(value: unknown): string {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "Array";
    }

    const itemTypes = Array.from(new Set(value.map(getValueJsDocType))).sort();
    return `${itemTypes.length === 1 ? itemTypes[0] : `(${itemTypes.join("|")})`}[]`;
  }

  if (value instanceof Map) {
    return "Map";
  }

  if (typeof value === "object") {
    return "Object";
  }

  return typeof value;
}

function mergeJsDocTypes(types: string[]) {
  const uniqueTypes = Array.from(new Set(types)).sort();
  const hasTypedArray = uniqueTypes.some((type) => type.endsWith("[]"));
  const normalizedTypes = hasTypedArray
    ? uniqueTypes.filter((type) => type !== "Array")
    : uniqueTypes;

  if (normalizedTypes.length === 0) {
    return "unknown";
  }

  return normalizedTypes.join("|");
}

function getParameterJsDocType(cases: DrillCase[], parameterIndex: number) {
  return mergeJsDocTypes(cases.map((testCase) => getValueJsDocType(testCase.args[parameterIndex])));
}

function createFunctionStarterCode(contract: DrillContract, cases: DrillCase[]) {
  const parameterDocs = contract.parameters
    .map((parameter, index) => ` * @param {${getParameterJsDocType(cases, index)}} ${parameter}`)
    .join("\n");

  return `/**
${parameterDocs}
 * @returns {${contract.returns}}
 */
function ${contract.functionName}(${contract.parameters.join(", ")}) {
  // implement me
}`;
}

export function defineDrillGroup(input: DefineDrillGroupInput): DrillGroup {
  return DrillGroupSchema.parse(input);
}

export function defineDrill(input: DefineDrillInput): Drill {
  return DrillSchema.parse(input);
}

export function defineFunctionDrill(input: DefineFunctionDrillInput): Drill {
  const cases = [...input.visible, ...input.hidden];
  const starterCode = input.starterCode ?? createFunctionStarterCode(input.contract, cases);

  return defineDrill({
    id: input.id,
    groupId: input.groupId,
    kind: "function",
    title: input.title,
    category: input.category,
    summary: input.summary,
    prompt: input.prompt,
    lesson: input.lesson,
    implementation: input.implementation ?? drillImplementations[input.id] ?? starterCode,
    contract: input.contract,
    assertion: input.assertion,
    starterCode,
    cases: {
      visible: input.visible,
      hidden: input.hidden,
    },
  });
}
