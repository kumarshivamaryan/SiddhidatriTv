import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Siddhidatri TV',
    },
    tagline: {
      type: String,
      default: 'Media Broadcast, Creative Production & Cloud Infrastructure',
    },
    mission: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    values: [
      {
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('CompanyInfo', companyInfoSchema);