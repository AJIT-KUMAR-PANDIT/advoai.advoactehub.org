import { NextResponse } from "next/server";

type DocRequest = {
  docType: string;
  partyA: string;
  partyB: string;
  jurisdiction: string;
  facts: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as DocRequest;
  const now = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const document = [
    `${body.docType || "Legal Document"}`,
    "",
    `Date: ${now}`,
    `Jurisdiction: ${body.jurisdiction || "[Insert jurisdiction]"}`,
    "",
    "Parties",
    `1. ${body.partyA || "[First party]"}`,
    `2. ${body.partyB || "[Second party]"}`,
    "",
    "Background",
    body.facts || "[Insert material facts, dates, communications, and supporting documents.]",
    "",
    "Operative Terms",
    "1. The parties shall perform their obligations in good faith and within the timelines recorded in this document.",
    "2. Any notice under this document shall be made in writing and preserved with proof of delivery.",
    "3. Remedies, costs, interest, and dispute resolution terms should be reviewed for local enforceability.",
    "",
    "Advocate Review Notes",
    "- Verify names, addresses, authority to sign, limitation periods, and stamping requirements.",
    "- Add governing law, forum, signatures, annexures, and witness blocks before final execution."
  ].join("\n");

  return NextResponse.json({ document });
}
