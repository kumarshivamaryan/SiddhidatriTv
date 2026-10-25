import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    categoryName: { type: String },
    client: { type: String, required: true },
    year: { type: String, default: '2026' },
    imageUrl: { type: String, required: true },
    projectUrl: { type: String, default: '' }, // <-- Project link (YouTube, Live site, GitHub, Behance)
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GalleryItem = mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;