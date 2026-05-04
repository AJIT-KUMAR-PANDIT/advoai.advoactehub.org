export type DuckModel = {
  id: string;
  label: string;
  description: string;
  speed: "fast" | "balanced" | "deep";
};

export const duckModels: DuckModel[] = [
  {
    id: "duck-auto",
    label: "Duck Auto",
    description: "Routes to the best available Duck.ai model for the legal task.",
    speed: "balanced"
  },
  {
    id: "duck-fast",
    label: "Duck Fast",
    description: "Lower latency for short consultations and intake questions.",
    speed: "fast"
  },
  {
    id: "duck-deep",
    label: "Duck Deep",
    description: "More careful reasoning for drafting, review, and case analysis.",
    speed: "deep"
  }
];

export function getDuckModel(modelId: string) {
  return duckModels.find((model) => model.id === modelId) ?? duckModels[0];
}
