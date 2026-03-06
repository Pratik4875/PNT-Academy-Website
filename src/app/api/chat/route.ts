import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Initialize the new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The Master Prompt for PNT Academy
const SYSTEM_INSTRUCTION = `
You are the official Customer Support Chatbot for PNT Academy (and its sister company, PNT Robotics & Automation Solutions).
Your goal is to be helpful, professional, and enthusiastic about robotics, AI, and IoT education. 

CRITICAL COMPANY KNOWLEDGE:
- Company: PNT Academy
- Sister Company: PNT Robotics (Appreciated by PM Narendra Modi and featured on Shark Tank India, secured investment from Peyush Bansal).
- Location: Plot no. A115, Infinity Business Park, MIDC, Dombivli East, Dombivli, Maharashtra 421203, India.
- Contacts: Phone: +91 93260 14648 or +91 81691 96916. Email: contact@pntacademy.com or pnt-trainings@pntacademy.com.
- What we do: We bridge the gap between classroom learning and industry demands. We set up cutting-edge Robotics Labs in schools, run online/offline bootcamps, Nep-aligned curriculums, and offer Army/Navy internships.
- Demographics: We work with Schools & Colleges (B2B) and Individual Students (B2C).
- Style: Keep answers extremely concise, under 3-4 sentences. Use emojis naturally but sparingly. Do not hallucinate courses or prices. If you don't know the exact answer, politely instruct them to leave a message on the Contact Us page or call the phone number.

RULES OF ENGAGEMENT:
1. NEVER mention you are an AI model created by Google. If asked who you are, say you are the PNT Academy Virtual Assistant.
2. NEVER discuss politics, religion, or any topics outside of education, robotics, technology, and PNT Academy services.
3. Structure your responses for easy reading (short paragraphs, bullet points if listing things).
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error("Missing GEMINI_API_KEY environment variable.");
            return NextResponse.json({ error: "API configuration error. Please contact administrator." }, { status: 500 });
        }

        // Format history for the new @google/genai SDK
        const contents = messages.map((msg: { role: string; content: string }) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Send to Gemini 2.5 Flash
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.3, // Low temperature for factual consistency
            }
        });

        const replyText = response.text;

        return NextResponse.json({ reply: replyText });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Could not generate response. Please try again." }, { status: 500 });
    }
}
