import readlineSync from "readline-sync";
import dotenv from "dotenv";
import { ChatMistralAI } from "@langchain/mistralai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import emailTool from "./email.tool.js";

dotenv.config();

console.log("=================================");
console.log(" 🤖 Mistral AI Email Agent");
console.log("=================================");

const history = [];

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const agent = createReactAgent({
  llm: model,
  tools: [emailTool],
});

async function chat(question) {
  history.push(new HumanMessage(question));

  const response = await agent.invoke({ messages: history });

  const aiMessage = response.messages.at(-1);
  history.push(new AIMessage(aiMessage.content));

  console.log("\nAI:", aiMessage.content, "\n");
}

async function startChat() {
  while (true) {
    const question = readlineSync.question("You: ");
    await chat(question);
  }
}

startChat();