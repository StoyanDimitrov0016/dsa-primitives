import { DrillGroupSchema, DrillSchema } from "./schemas";
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
  contract: DrillContract;
  assertion?: DrillAssertion;
  starterCode?: string;
  visible: DrillCase[];
  hidden: DrillCase[];
};

function createFunctionStarterCode(contract: DrillContract) {
  return `function ${contract.functionName}(${contract.parameters.join(", ")}) {
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
  return defineDrill({
    id: input.id,
    groupId: input.groupId,
    kind: "function",
    title: input.title,
    category: input.category,
    summary: input.summary,
    prompt: input.prompt,
    lesson: input.lesson,
    contract: input.contract,
    assertion: input.assertion,
    starterCode: input.starterCode ?? createFunctionStarterCode(input.contract),
    cases: {
      visible: input.visible,
      hidden: input.hidden,
    },
  });
}
