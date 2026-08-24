export type LinkItem = {
  label: string;
  href: string;
};

export type ProofItem = {
  value: string;
  label: string;
};

export type MapNodeKind = "center" | "practice" | "system" | "principle";

export type MapNodeItem = {
  id: string;
  label: string;
  kicker: string;
  summary: string;
  kind: MapNodeKind;
  position: { x: number; y: number };
  evidenceId?: string;
};

export type MapEdgeItem = {
  id: string;
  source: string;
  target: string;
};

export type EvidenceFact = {
  label: string;
  value: string;
};

export type EvidenceCase = {
  id: string;
  index: string;
  title: string;
  thesis: string;
  problem: string;
  ownership: string;
  decision: string;
  facts: EvidenceFact[];
  links: LinkItem[];
  artifact: "trace" | "contract" | "forecast";
};

export type JourneyItem = {
  period: string;
  role: string;
  organization: string;
  summary: string;
  proof?: string;
};
