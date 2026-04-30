import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { getPersona } from "@/lib/personas";
import { Message } from "@/types";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, personaId } = body as {
      messages: Message[];
      personaId: string;
    };

    if (!messages || !personaId) {
      return NextResponse.json(
        { error: "Missing messages or personaId" },
        { status: 400 }
      );
    }

    const persona = getPersona(personaId);

    const groqMessages = messages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: persona.systemPrompt },
        ...groqMessages,
      ],
      temperature: 0.75,
      max_tokens: 512,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
