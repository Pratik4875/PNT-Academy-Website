"use server";
import connectMongo from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";
import School from "@/lib/models/School";
import Internship from "@/lib/models/Internship";

// Using Lean() for plain JSON objects to pass safely to Client Components
export async function getLiveGallery() {
    try {
        await connectMongo();
        const items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error("Failed to fetch gallery:", error);
        return [];
    }
}

export async function getLiveSchools() {
    try {
        await connectMongo();
        const items = await School.find({}).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error("Failed to fetch schools:", error);
        return [];
    }
}

export async function getLiveInternships() {
    try {
        await connectMongo();
        const items = await Internship.find({}).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error("Failed to fetch internships:", error);
        return [];
    }
}
