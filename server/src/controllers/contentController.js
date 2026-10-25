import CompanyInfo from '../models/CompanyInfo.js';
import Founder from '../models/Founder.js';
import Testimonial from '../models/Testimonial.js';

// ==================== COMPANY INFO ====================
export const getCompanyInfo = async (req, res) => {
  try {
    const info = await CompanyInfo.findOne();
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCompanyInfo = async (req, res) => {
  try {
    const info = await CompanyInfo.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ==================== FOUNDERS ====================
export const getFounders = async (req, res) => {
  try {
    const founders = await Founder.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: founders.length, data: founders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createFounder = async (req, res) => {
  try {
    const founder = await Founder.create(req.body);
    res.status(201).json({ success: true, data: founder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateFounder = async (req, res) => {
  try {
    const founder = await Founder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!founder) return res.status(404).json({ success: false, message: 'Founder not found' });
    res.status(200).json({ success: true, data: founder });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteFounder = async (req, res) => {
  try {
    const founder = await Founder.findByIdAndDelete(req.params.id);
    if (!founder) return res.status(404).json({ success: false, message: 'Founder not found' });
    res.status(200).json({ success: true, message: 'Founder removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== TESTIMONIALS ====================
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isVisible: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};