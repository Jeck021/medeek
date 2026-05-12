import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

const SYSTEM_PROMPT = `You are Aria, the friendly virtual assistant for Medeek Ambulatory Surgical Clinic in Bacoor, Cavite, Philippines.

About the clinic:
- Modern outpatient (ambulatory) surgical center focused on same-day procedures.
- Compassionate, LGBTQ+ friendly care with expert clinicians.
- Services include minor and ambulatory surgical procedures, pre-op consults, and post-op follow-up.

Your job:
- Warmly greet visitors and answer questions about the clinic, services, hours, location, and what to expect.
- Help users book a consultation by guiding them to the "Book" section of the site or collecting their name, contact, preferred date, and concern.
- Be reassuring, calm, and professional. Keep responses concise (2-4 short paragraphs max) and use light markdown.
- For medical emergencies, advise calling local emergency services immediately. Never give specific medical diagnoses or treatment plans — recommend an in-person consultation for clinical questions.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("google/gemini-3-flash-preview");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse();
      },
    },
  },
});
