import { getLiveFaqs, getAdminSettings } from "@/lib/actions/db";
import ContactClient from "@/components/ContactClient";
import Footer from "@/components/Footer";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function ContactPage() {
    const [faqs, settings] = await Promise.all([
        getLiveFaqs(),
        getAdminSettings()
    ]);

    return (
        <>
            <ContactClient faqs={faqs} settings={settings} />
            <Footer />
        </>
    );
}
