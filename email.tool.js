import { tool } from "@langchain/core/tools";
import * as z from "zod";
import sendEmailService from "./mail.service.js";

const emailTool = tool(
  async ({ to, subject, html }) => {
    return await sendEmailService(to, subject, html);
  },
  {
    name: "sendEmail",
    description: "Send an email to a given address with subject and html body",
    schema: z.object({
      to: z.string().describe("Recipient email address"),
      subject: z.string().describe("Email subject"),
      html: z.string().describe("Email body in HTML format"),
    }),
  }
);

export default emailTool;