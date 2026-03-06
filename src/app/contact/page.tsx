import { getLiveFaqs } from "@/lib/actions/db";
import ContactClient from "@/components/ContactClient";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function ContactPage() {
    const faqs = await getLiveFaqs();
    return <ContactClient faqs={faqs} />;
}
