import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminSettings extends Document {
    name: string;
    email: string;
    profileImage?: string; // Base64 data URL
}

const AdminSettingsSchema = new Schema<IAdminSettings>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImage: { type: String },
});

export default mongoose.models.AdminSettings || mongoose.model<IAdminSettings>('AdminSettings', AdminSettingsSchema);
