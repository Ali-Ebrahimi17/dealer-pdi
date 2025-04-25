import { Schema, model, models } from 'mongoose'
import { boolean } from 'zod'
const { ObjectId } = Schema

// Define the schema
const inspectionSchema = new Schema(
  {
    bay: {
      type: String,
    },
    serialNumber: {
      type: String,
    },
    dealer: {
      type: String,
    },
    model: {
      type: String,
    },
    buildNumber: {
      type: String,
    },
    countryName: {
      type: String,
    },
    countryFlag: {
      type: String,
    },
    intFaults: {
      type: Number,
    },
    started: {
      type: Date,
    },
    open: {
      type: Boolean,
      default: true,
    },
    top5Internalfaults: [
      {
        _id: { type: String },
        count: { type: Number },
      },
      { default: [] },
    ],
    top5DoaClaims: [
      {
        _id: { type: String },
        count: { type: Number },
      },
      { default: [] },
    ],
    // emailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // emailVerifiedAt: {
    //   type: Date,
    // },
    // resetToken: {
    //   type: String,
    // },
    // resetTokenExpires: {
    //   type: Date,
    // },
    // varificationToken: {
    //   type: String,
    // },
    // varificationTokenExpires: {
    //   type: Date,
    // },
    // canUpload: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
)
// Define the  model
const Inspection = models?.Inspection || model('Inspection', inspectionSchema)

export default Inspection
