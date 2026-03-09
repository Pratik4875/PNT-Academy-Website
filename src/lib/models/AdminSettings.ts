import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminSettings extends Document {
    name: string;
    email: string;
    profileImage?: string; // Base64 data URL
    socialLinks: {
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        youtube?: string;
    };
    careersLink?: string;
    sheetsWebhookUrl?: string; // For auto-syncing enquiries to Google Sheets
    paymentDetails?: {
        upiId?: string;
        upiQrCodeBase64?: string;
        accountName?: string;
        accountNumber?: string;
        ifscCode?: string;
        bankName?: string;
    };
}

const AdminSettingsSchema = new Schema<IAdminSettings>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String },
    socialLinks: {
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        twitter: { type: String, default: "" },
        youtube: { type: String, default: "" },
    },
    careersLink: { type: String, default: "" },
    sheetsWebhookUrl: { type: String, default: "" },
    paymentDetails: {
        upiId: { type: String, default: "" },
        upiQrCodeBase64: { type: String, default: "" },
        accountName: { type: String, default: "" },
        accountNumber: { type: String, default: "" },
        ifscCode: { type: String, default: "" },
        bankName: { type: String, default: "" },
    },
});

export default mongoose.models.AdminSettings || mongoose.model<IAdminSettings>('AdminSettings', AdminSettingsSchema);
