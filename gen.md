Here’s a clean, structured **`skills-advoAI.md`** you can directly use for your LLM / RepoAgent / system design:

---

```md
# 🧠 AdvoAI Skills Specification

## 📌 Project Overview
AdvoAI is a ChatGPT-like legal AI platform built using Next.js (latest version).  
It acts as a **wrapper over Duck.ai**, providing a structured, extensible, and production-ready interface tailored for advocates, legal drafting, and document intelligence.

---

## 🏗️ Core Architecture

### 1. Frontend
- Framework: Next.js (App Router, latest)
- UI: ChatGPT-like conversational interface
- Features:
  - Chat history
  - New chat sessions
  - Voice input/output
  - Prompt switching UI
  - Document generation view (SuperDoc)

---

### 2. Backend Structure

```

/app
/chat        → Chat UI & session handling
/voice       → Voice input/output handling
/doc         → Document generation (SuperDoc)
/api         → API routes

/du            → Duck.ai wrapper layer
/models      → All available Duck.ai models
/chat        → Chat forwarding logic
/voice       → Voice integration with Duck.ai
/session     → Session persistence & mapping

/pro           → Prompt system
prompts/*.md → Individual prompt files
p.json       → Priority + metadata config

/config        → Environment configs
.env         → Core configs
auth.env     → Authgear configs
du.env       → Duck.ai configs
voice.env    → Voice configs
doc.env      → Document configs

````

---

## 🤖 Duck.ai Integration (Wrapper Layer)

- Acts as the **core AI engine**
- All model calls routed via `/du`
- Supports:
  - Multi-model switching
  - Streaming responses
  - Context-aware sessions
- No direct UI dependency — fully abstracted

---

## 🧾 Prompt Engine (`/pro`)

### Prompt Files
- Stored as `.md` files
- Each prompt defines:
  - Role
  - Tone
  - Legal specialization
  - Constraints

### `p.json` Structure
```json
{
  "default": "legal_assistant",
  "priority": ["legal_assistant", "drafting_expert"],
  "trending": [],
  "last_used": "contract_generator"
}
````

### Features

* Default prompt auto-loaded
* Priority-based execution
* Auto-update based on:

  * Recent usage
  * Trending prompts
* UI prompt switcher
* Background prompt optimization

---

## 🎤 Voice System

* Speech-to-Text (STT)
* Text-to-Speech (TTS)
* Real-time voice chat
* Integrated into `/voice` and `/du`

---

## 📄 SuperDoc (Document Intelligence System)

### Features

* Auto-generate:

  * Agreements
  * Contracts
  * Legal notices
* Google Docs-like experience
* Export formats:

  * `.docx`
  * `.pdf`

### Smart Capabilities

* Grammar correction
* Spell checking
* Legal formatting
* Section alignment
* Version history
* Session-based editing memory

---

## 🔐 Authentication (Authgear)

* Auth provider: Authgear
* Config stored in `auth.env`

### Features

* Login / Signup
* JWT-based sessions
* Role-based access (future-ready)
* Secure API protection

---

## ⚙️ Environment Configuration Strategy

Each module has isolated config:

```
.env        → Core app config
auth.env    → Authentication
du.env      → Duck.ai API & models
voice.env   → Voice services
doc.env     → Document engine
```

### Benefits

* Modular configuration
* Secure separation
* Easy scaling

---

## 🧠 Session System

* Persistent chat sessions
* Context retention over time
* Stored in:

  * Local DB / IndexedDB / backend DB
* Session mapped to Duck.ai context

---

## 🚀 Advanced Features (Extended)

### 1. AI Legal Modes

* Drafting Mode
* Consultation Mode
* Case Analysis Mode
* Research Mode

---

### 2. Smart Suggestions

* Auto-suggest clauses
* Predict next legal steps
* Context-aware drafting

---

### 3. Multi-Model Support

* Switch between Duck.ai models dynamically
* Performance vs accuracy modes

---

### 4. Offline/Local LLM Support (Future)

* Plug-in architecture for local models

---

### 5. Analytics Dashboard (Future)

* Usage tracking
* Prompt performance
* Model efficiency

---

### 6. Real-time Collaboration (Future)

* Multiple users editing documents
* Live updates

---

### 7. Legal Knowledge Base (Future)

* Integrated case laws
* Searchable database

---

## 🧩 API Design

### Core APIs

* `/api/chat` → Chat handling
* `/api/voice` → Voice processing
* `/api/doc` → Document generation
* `/api/prompt` → Prompt management
* `/api/session` → Session control

---

## 🎯 UX Principles

* Minimal latency
* Clean ChatGPT-like UI
* One-click document generation
* Seamless voice interaction
* Zero learning curve for advocates

---

## 🔥 Final Goal

Build a **full-stack AI legal assistant platform** that:

* Feels like ChatGPT
* Works like Duck.ai
* Thinks like a legal expert
* Writes like a professional advocate

---

## 🧪 Future Expansion Ideas

* Court filing automation
* E-signature integration
* Client portal
* Payment gateway for drafting services
* AI-powered legal marketplace

---

## ✅ Summary

AdvoAI =
**Duck.ai (brain) + Prompt Engine (logic) + SuperDoc (output) + Next.js UI (experience)**

---

```

---

If you want next step, say:

👉 “convert this into full repo structure + starter code”  
👉 “generate Next.js boilerplate for this”  
👉 “design database schema”  

I’ll take it to production-level.
```
