import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getAdminSettings, getLiveFaqs } from "@/lib/actions/db";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "API configuration error." }, { status: 500 });
        }

        // 1. Fetch Dynamic Knowledge Base
        const [settings, faqs] = await Promise.all([
            getAdminSettings(),
            getLiveFaqs()
        ]);

        const directorName = settings?.name || "Pratik Tirodkar";
        const faqKnowledge = faqs.length > 0
            ? "\nFREQUENTLY ASKED QUESTIONS (Use these for accuracy):\n" +
            faqs.map((f: any) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")
            : "";

        // 2. Build Master Prompt
        const DYNAMIC_SYSTEM_INSTRUCTION = `
You are the official Customer Support Chatbot for PNT Academy (and its sister company, PNT Robotics & Automation Solutions).
Your goal is to be helpful, professional, and enthusiastic about robotics, AI, and IoT education. 

COMPANY CONTEXT:
- Academy Name: PNT Academy
- Founder & Owner: Pratik Tirodkar (who is also the Founder & Director of PNT Robotics). 
- Developer Credit: This official website/portal was built and is being maintained by a dedicated developer working closely with Pratik Tirodkar's vision.
- Sister Company: PNT Robotics (Appreciated by PM Narendra Modi and featured on Shark Tank India, secured investment from Peyush Bansal).
- Location: Plot no. A115, Infinity Business Park, MIDC, Dombivli East, Dombivli, Maharashtra 421203, India.
- Contacts: Phone: +91 93260 14648 or +91 81691 96916. Email: contact@pntacademy.com.
- Specialized Services: Robotics Lab setup in schools, Army/Navy internships, NEP-aligned curriculums, and Hands-on STEM training (4th-12th grade).
${faqKnowledge}

RULES OF ENGAGEMENT:
1. IDENTITY: You are the "PNT Academy Virtual Assistant". Never mention being an AI by Google.
2. CONCISE: Keep answers under 3 sentences unless explaining a complex step.
3. FALLBACK: If a user asks for something outside of this knowledge (like specific pricing not listed or proprietary tech), tell them to use the "Contact Sales" button or WhatsApp for an official quote from Pratik Tirodkar's team.
4. TONE: Professional but energetic.
`;

        // 3. Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: DYNAMIC_SYSTEM_INSTRUCTION
        });

        // 4. Format history
        const contents = messages
            .filter(msg => msg.content && msg.content.trim() !== "")
            .map((msg: { role: string; content: string }) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));

        if (contents.length === 0) {
            return NextResponse.json({ reply: "How can I help you today?" });
        }

        // 5. Generate content
        const result = await model.generateContent({
            contents: contents,
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 800,
            }
        });

        const response = await result.response;
        const replyText = response.text() || "I'm having trouble retrieving that. Please try again or contact us via WhatsApp.";

        return NextResponse.json({ reply: replyText });

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({
            error: "Could not generate response.",
            details: error.message
        }, { status: 500 });
    }
}
