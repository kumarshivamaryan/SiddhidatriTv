import GalleryItem from '../models/GalleryItem.js';

export const getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    const items = await GalleryItem.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, categoryName, client, year, projectUrl, description } = req.body;

    // Grab Cloudinary URL from Multer upload
    const imageUrl = req.file?.path || req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please choose an image file from your device.',
      });
    }

    const newItem = await GalleryItem.create({
      title,
      category,
      categoryName: categoryName || category,
      client,
      year: year || new Date().getFullYear().toString(),
      imageUrl,
      projectUrl: projectUrl || '',
      description,
    });

    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.status(200).json({ success: true, message: 'Gallery item removed successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};