import * as mongoose from 'mongoose';

export const AfileSchema = new mongoose.Schema(
  {
    mimetype: String,
    size: Number,
    encoding: String,
    originalName: String,
    publicPath: String,
    md5: String,
  },
  { timestamps: true },
);
