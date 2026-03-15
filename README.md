# 🤖 Mistral AI Email Agent

A conversational AI agent built with **LangChain**, **LangGraph**, and **Mistral AI** that can send emails via Gmail using natural language commands.

---

## 📁 Project Structure

```
email-agent/
├── index.js          # Main agent & chat loop
├── email.tool.js     # LangChain tool wrapper for email
├── mail.service.js   # Nodemailer Gmail service
├── .env              # Environment variables
└── package.json
```

---

## ⚙️ Prerequisites

- Node.js v18+
- A Gmail account
- Google Cloud OAuth2 credentials
- Mistral AI API key

---

## 🚀 Setup

### 1. Clone & Install

```bash
git clone https://github.com/Samarth0802/Email-AI-Agent.git
cd email-agent
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root:

```env
MISTRAL_API_KEY=your_mistral_api_key

GMAIL_USER=your_email@gmail.com
GMAIL_CLIENT_ID=your_google_client_id
GMAIL_CLIENT_SECRET=your_google_client_secret
GMAIL_REFRESH_TOKEN=your_google_refresh_token
```

### 3. Getting Gmail OAuth2 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project → Enable **Gmail API**
3. Go to **Credentials** → Create **OAuth 2.0 Client ID**
4. Use [OAuth Playground](https://developers.google.com/oauthplayground/) to generate a refresh token
   - Scope: `https://mail.google.com/`
5. Copy `Client ID`, `Client Secret`, and `Refresh Token` into `.env`

---

## ▶️ Running the Agent

```bash
node index.js
```

You'll see:

```
=================================
 🤖 Mistral AI Email Agent
=================================
You:
```

---

## 💬 Usage Examples

```
You: Send an email to john@example.com about the meeting tomorrow
You: Email sara@example.com with subject "Invoice" and include payment details
You: Write a professional apology email to boss@company.com
```

The agent will automatically call the email tool and send the email.

---

## 🛠️ Tech Stack

| Package | Purpose |
|---|---|
| `@langchain/langgraph` | Agent runtime (`createReactAgent`) |
| `@langchain/mistralai` | Mistral AI LLM |
| `@langchain/core` | Tools, messages |
| `nodemailer` | Gmail email sending |
| `readline-sync` | CLI chat interface |
| `dotenv` | Environment config |
| `zod` | Tool schema validation |

---

## 📝 How It Works

1. User types a message in the terminal
2. `index.js` passes the full conversation history to the agent
3. The agent (Mistral AI) decides whether to call the `sendEmail` tool
4. `email.tool.js` validates the inputs using Zod schema
5. `mail.service.js` sends the email via Gmail OAuth2
6. The agent responds with a confirmation

---

## 🔒 Security Notes

- Never commit your `.env` file — add it to `.gitignore`
- OAuth2 is used instead of plain password for better security
- Refresh tokens should be kept private

---

## 🐛 Common Issues

**`ERR_PACKAGE_PATH_NOT_EXPORTED` from `langchain/agents`**
→ Use `@langchain/langgraph/prebuilt` instead

**`createAgent` not found**
→ Use `createReactAgent` — available in all `@langchain/langgraph` versions

**Gmail auth error**
→ Make sure your refresh token is valid and Gmail API is enabled in Google Cloud Console

---

