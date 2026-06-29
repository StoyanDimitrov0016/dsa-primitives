import { defineFunctionDrill } from "../define-drill";

const graph = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: [],
  E: [],
};

const pathGraph = {
  A: ["B"],
  B: ["C", "D"],
  C: [],
  D: ["E"],
  E: [],
};

export const graphDrills = [
  defineFunctionDrill({
    id: "build-adjacency-list",
    groupId: "graphs",
    title: "Build Adjacency List",
    category: "Graphs",
    summary: "Convert directed edges into an adjacency list.",
    prompt:
      "Return an object where each key is a node and each value is an array of outgoing neighbors. The input is an array of directed edges shaped as [from, to].",
    lesson: [
      {
        type: "principle",
        title: "Neighbors by node",
        text: "An adjacency list groups the graph by source node so traversal can quickly find where to go next.",
      },
      {
        type: "paragraph",
        text: "For each edge, ensure the source node has an array, then append the destination node.",
      },
      {
        type: "paragraph",
        text: "Also include destination nodes with an empty array if they have no outgoing edges.",
      },
    ],
    contract: {
      functionName: "buildAdjacencyList",
      parameters: ["edges"],
      returns: "Record<string, string[]>",
    },
    visible: [
      {
        name: "builds outgoing neighbors",
        args: [
          [
            ["A", "B"],
            ["A", "C"],
            ["B", "D"],
          ],
        ],
        expected: { A: ["B", "C"], B: ["D"], C: [], D: [] },
      },
      {
        name: "handles an empty graph",
        args: [[]],
        expected: {},
      },
    ],
    hidden: [
      {
        name: "handles repeated sources",
        args: [
          [
            ["x", "y"],
            ["x", "z"],
            ["z", "x"],
          ],
        ],
        expected: { x: ["y", "z"], y: [], z: ["x"] },
      },
    ],
  }),
  defineFunctionDrill({
    id: "graph-bfs",
    groupId: "graphs",
    title: "Graph BFS",
    category: "Graphs",
    summary: "Visit graph nodes breadth-first from a start node.",
    prompt:
      "Return an array of nodes visited by breadth-first search from start. Use the adjacency list order as the neighbor order and do not visit a node twice.",
    lesson: [
      {
        type: "principle",
        title: "Queue by distance",
        text: "Breadth-first search explores all nearer nodes before moving farther away.",
      },
      {
        type: "steps",
        title: "Traversal rule",
        items: [
          "Push the start node into a queue.",
          "Remove the oldest node, record it, and enqueue unvisited neighbors.",
          "Mark nodes as visited before enqueueing them to avoid duplicates.",
        ],
      },
      {
        type: "paragraph",
        text: "This is the graph version of level-order traversal.",
      },
    ],
    contract: {
      functionName: "bfs",
      parameters: ["graph", "start"],
      returns: "string[]",
    },
    visible: [
      {
        name: "visits by distance from start",
        args: [graph, "A"],
        expected: ["A", "B", "C", "D", "E"],
      },
      {
        name: "handles missing start",
        args: [graph, "Z"],
        expected: [],
      },
    ],
    hidden: [
      {
        name: "starts from a middle node",
        args: [graph, "B"],
        expected: ["B", "D"],
      },
    ],
  }),
  defineFunctionDrill({
    id: "graph-dfs",
    groupId: "graphs",
    title: "Graph DFS",
    category: "Graphs",
    summary: "Visit graph nodes depth-first from a start node.",
    prompt:
      "Return an array of nodes visited by depth-first search from start. Use the adjacency list order as the neighbor order and do not visit a node twice.",
    lesson: [
      {
        type: "principle",
        title: "Go deep before wide",
        text: "Depth-first search follows one branch as far as possible before backtracking.",
      },
      {
        type: "paragraph",
        text: "A recursive DFS records the current node, marks it visited, then recursively visits each unvisited neighbor.",
      },
      {
        type: "paragraph",
        text: "The visited set is required because graphs can contain cycles.",
      },
    ],
    contract: {
      functionName: "dfs",
      parameters: ["graph", "start"],
      returns: "string[]",
    },
    visible: [
      {
        name: "visits depth first",
        args: [graph, "A"],
        expected: ["A", "B", "D", "C", "E"],
      },
      {
        name: "handles missing start",
        args: [graph, "Z"],
        expected: [],
      },
    ],
    hidden: [
      {
        name: "starts from a middle node",
        args: [graph, "C"],
        expected: ["C", "E"],
      },
    ],
  }),
  defineFunctionDrill({
    id: "has-path",
    groupId: "graphs",
    title: "Has Path",
    category: "Graphs",
    summary: "Return whether one graph node can reach another.",
    prompt:
      "Return true if there is a directed path from source to target. The graph is an adjacency list object, and cycles should not cause repeated visits.",
    lesson: [
      {
        type: "principle",
        title: "Reachability",
        text: "A path exists if the target is the current node or can be reached from one of its neighbors.",
      },
      {
        type: "paragraph",
        text: "You can solve this with BFS or DFS. In either case, track visited nodes so cycles do not loop forever.",
      },
      {
        type: "paragraph",
        text: "Returning as soon as the target is found avoids unnecessary traversal.",
      },
    ],
    contract: {
      functionName: "hasPath",
      parameters: ["graph", "source", "target"],
      returns: "boolean",
    },
    visible: [
      {
        name: "finds a reachable node",
        args: [pathGraph, "A", "E"],
        expected: true,
      },
      {
        name: "returns false when unreachable",
        args: [pathGraph, "C", "E"],
        expected: false,
      },
    ],
    hidden: [
      {
        name: "handles same source and target",
        args: [pathGraph, "B", "B"],
        expected: true,
      },
      {
        name: "handles missing source",
        args: [pathGraph, "Z", "A"],
        expected: false,
      },
    ],
  }),
];
