import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  prompt: z.string().min(40).max(4000),
});

export const requestReading = createServerFn({ method: "POST" })
  .validator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "AI is not available" };
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 900,
        temperature: 0.4,
        messages: [{ role: "user", content: data.prompt }],
      }),
    });
    if (!res.ok) return { ok: false as const, error: `xAI API error ${res.status}` };
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });
