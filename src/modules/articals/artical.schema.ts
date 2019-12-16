import * as mongoose from 'mongoose';

export const ArticalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
    },
    file: {
      type: 'ObjectId',
      ref: 'File',
      required: true,
    },
  },
  { timestamps: true },
);
