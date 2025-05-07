# 📝 Notion-Style Notes Editor with Embedded AI Chat

This project is a rich-text note-taking app inspired by Notion with an embedded AI assistant chat (like ChatGPT) per note. The chat interface allows contextual discussions inside the note and uses a mock API to simulate AI responses.

---

## 🔧 Tech Stack

- **Next.js** – App framework for React with routing and SSR
- **TypeScript** – Static type checking
- **Tailwind CSS** – Utility-first CSS framework for styling
- **TipTap v2** – Rich-text editor (based on ProseMirror)
- **Zustand** – Global state management (lightweight, scalable)
- **Mock API** – Dummy function to simulate AI assistant responses

---

## 📦 Features

### 📝 Notes System
- Sidebar to view and switch between multiple notes
- Each note includes:
  - A **title**
  - A **TipTap rich-text editor** supporting:
    - Paragraphs
    - Headings (H1, H2, H3)
    - Bullet list
    - Numbered list
- Dynamic note creation and switching

### 🤖 AI Chat (Embedded per Note)
- Circular AI button at the bottom-right of each note panel
- On click, opens a **floating, non-modal chat** below the editor
- Chat supports:
  - Typing and submitting a prompt
  - Sending to a **dummy API** (mocked AI response)
  - Rendering user messages (right aligned)
  - Rendering AI messages (left aligned)
  - Per-note chat history (each note retains its own conversation)

### 🧠 State Handling (with Zustand)
- Global state:
  - Notes list, active note ID, editor content
  - Chat messages per note
- Local state:
  - Chat open/close toggle
- Optional autosave/localStorage for persistence

---

## 🧪 Mock AI API Call

There is no real backend or OpenAI integration. A dummy API simulates an AI response with a delay:

```ts
// utils/mockApi.ts
export const sendMessageToAI = async (message: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🧠 AI: This is a mock response to your message: " + message);
    }, 1000); // Simulates delay
  });
};

```

🚀 Getting Started
1. Clone the Repository
```ts
git clone https://github.com/your-username/notes-ai-editor
cd notes-ai-editor
```
2. Install Dependencies
```ts
npm install
# or
yarn install
```
3. Run the Development Server
```ts
npm run dev
# or
yarn dev
```
Then visit: http://localhost:3000

📁 Project Structure (Simplified)
```ts
.
├── components/       # UI and layout components
├── features/
│   ├── notes/        # Notes logic and editor integration
│   └── chat/         # Chat button, message UI, state
├── pages/            # Next.js routes
├── store/            # Zustand global state
├── utils/            # Utility functions (e.g., mock API)
├── types/            # TS interfaces/types
└── public/           # Static assets
```
