# Jarvis Bot

A personal AI assistant for Telegram powered by [OpenCode](https://opencode.ai), built with [Bun](https://bun.com) and TypeScript.

It bridges your Telegram chat to a locally running OpenCode server, letting you switch between AI agents and saved conversation contexts, send voice notes, photos, and documents, and receive files or live progress updates from long-running agent tasks.

## Features

- **Private single-user access** — Only responds to the configured `USER_TELEGRAM_ID`.
- **Agents & Models (`/agent`)** — Switch between configured AI agents (OpenRouter / OpenCode providers) stored in SQLite via Prisma.
- **Saved Contexts (`/new`, `/save_context`, `/context`)** — Start fresh OpenCode sessions, bookmark them by name, and switch back anytime.
- **Multimodal input**
  - **Voice messages** — Transcribed to text via OpenRouter STT before being sent to the agent.
  - **Photos & albums** — Forwarded to the agent as image attachments (with optional OCR prompt support).
  - **Documents & file batches** — Downloaded to `DOWNLOAD_DIR` so the agent can inspect and process them locally.
- **Local HTTP bridge (`http://localhost:3002`)** — A Hono server exposing `/api/send-message` and `/api/send-file` (paired with the agent skills in [`skills/`](./skills)) so the agent can stream progress updates and deliver generated files back to Telegram.

## Tech Stack

- **Runtime:** Bun + TypeScript
- **Telegram Bot:** grammY (`@grammyjs/menu`, `@grammyjs/conversations`)
- **AI / Agents:** `@opencode-ai/sdk`, `@openrouter/sdk`
- **Database:** Prisma + SQLite (`@prisma/adapter-libsql`)
- **Local Bridge Server:** Hono
- **Vector Store (WIP):** Qdrant (`@qdrant/js-client-rest`)

## Setup

1. **Install dependencies**

   ```bash
   bun install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your credentials:

   ```bash
   cp .env.example .env
   ```

3. **Initialize the SQLite database**

   ```bash
   bunx prisma generate
   bunx prisma migrate deploy
   bunx prisma db seed
   ```

4. **Start OpenCode & run the bot**

   Ensure your OpenCode server is running at `OPEN_CODE_BASE_URL` (default `http://127.0.0.1:4096`), then run:

   ```bash
   bun run index.ts
   ```

## Bot Commands

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `/start`        | Verify the bot is running                |
| `/new`          | Start a new OpenCode session             |
| `/save_context` | Save the active session under a name     |
| `/context`      | Switch between saved conversation contexts |
| `/agent`        | Switch the active AI agent               |
| `/id`           | Display your Telegram user ID            |
