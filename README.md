# AdvoAI Next.js Starter

AdvoAI is a ChatGPT-like legal AI workspace built with the Next.js App Router. It includes a provider-agnostic Duck.ai wrapper, prompt files, chat modes, voice intake, and a SuperDoc drafting surface.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Structure

- `app/chat` - conversational legal assistant UI
- `app/doc` - SuperDoc drafting workspace
- `app/voice` - voice intake workspace
- `app/api/*` - API routes for chat, docs, prompts, sessions, and voice
- `du/*` - Duck.ai wrapper, model registry, session helpers, voice adapter
- `pro/prompts/*.md` - legal prompt definitions
- `pro/p.json` - prompt priority and metadata
- `config/*.env.example` - module-level configuration examples

## Duck.ai

The chat route returns a local starter response until these variables are configured:

```bash
DUCK_AI_BASE_URL=
DUCK_AI_API_KEY=
```

Once configured, `/api/chat` forwards messages through `du/chat.ts` without coupling the UI to provider-specific details.
