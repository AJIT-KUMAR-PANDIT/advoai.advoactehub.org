"use client";

import { FormEvent, useState } from "react";
import { Clipboard, Download, FileText, Wand2 } from "lucide-react";

export function DocWorkspace() {
  const [docType, setDocType] = useState("Legal Notice");
  const [partyA, setPartyA] = useState("");
  const [partyB, setPartyB] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [facts, setFacts] = useState("");
  const [document, setDocument] = useState(defaultDocument);
  const [status, setStatus] = useState("Ready");

  async function generateDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Generating document");

    const response = await fetch("/api/doc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docType, partyA, partyB, jurisdiction, facts })
    });

    const payload = await response.json();
    setDocument(payload.document);
    setStatus("Draft ready");
  }

  async function copyDocument() {
    await navigator.clipboard.writeText(document);
    setStatus("Copied");
  }

  function downloadMarkdown() {
    const blob = new Blob([document], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${docType.toLowerCase().replace(/\s+/g, "-")}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded");
  }

  return (
    <section className="workspace">
      <header className="workspace-header">
        <div className="title-block">
          <p className="eyebrow">SuperDoc</p>
          <h2>Document intelligence</h2>
          <p>Create structured legal drafts with editable sections, review notes, and export-ready content.</p>
        </div>
      </header>

      <div className="split-workspace">
        <form className="panel" onSubmit={generateDocument}>
          <div className="panel-header">
            <h3>Draft brief</h3>
            <p>Capture the minimum facts needed for a clean first draft.</p>
          </div>
          <div className="panel-body">
            <div className="field">
              <label htmlFor="docType">Document type</label>
              <select className="select" id="docType" value={docType} onChange={(event) => setDocType(event.target.value)}>
                <option>Legal Notice</option>
                <option>Service Agreement</option>
                <option>Lease Agreement</option>
                <option>Settlement Terms</option>
                <option>Case Brief</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="partyA">First party</label>
              <input className="input" id="partyA" value={partyA} onChange={(event) => setPartyA(event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="partyB">Second party</label>
              <input className="input" id="partyB" value={partyB} onChange={(event) => setPartyB(event.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="jurisdiction">Jurisdiction</label>
              <input
                className="input"
                id="jurisdiction"
                value={jurisdiction}
                onChange={(event) => setJurisdiction(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="facts">Material facts</label>
              <textarea
                className="textarea"
                id="facts"
                value={facts}
                onChange={(event) => setFacts(event.target.value)}
                rows={8}
              />
            </div>
            <button className="primary-button" type="submit">
              <Wand2 size={18} />
              Generate draft
            </button>
            <p className="status-line">{status}</p>
          </div>
        </form>

        <section className="panel doc-editor">
          <div className="toolbar">
            <div className="toolbar-group">
              <span className="message-meta">
                <FileText size={16} />
                Editable draft
              </span>
            </div>
            <div className="toolbar-group">
              <button className="tool-button" onClick={copyDocument} type="button">
                <Clipboard size={16} />
                Copy
              </button>
              <button className="tool-button" onClick={downloadMarkdown} type="button">
                <Download size={16} />
                .md
              </button>
            </div>
          </div>
          <textarea
            className="document-textarea"
            onChange={(event) => setDocument(event.target.value)}
            value={document}
          />
        </section>
      </div>
    </section>
  );
}

const defaultDocument = [
  "Legal Notice",
  "",
  "Date: [Insert date]",
  "Jurisdiction: [Insert jurisdiction]",
  "",
  "Parties",
  "1. [First party]",
  "2. [Second party]",
  "",
  "Background",
  "[Describe the material facts, dates, correspondence, and documents.]",
  "",
  "Relief Sought",
  "[State the action required, deadline, costs, interest, and consequences of non-compliance.]"
].join("\n");
