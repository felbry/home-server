import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema(
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
