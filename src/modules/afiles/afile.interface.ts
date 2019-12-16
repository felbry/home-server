import { BaseAndTimestamp } from '../base.interface';
export class Afile extends BaseAndTimestamp {
  mimetype: string;
  size: number;
  encoding: string;
  originalName: string;
  publicPath: string;
  md5: string;
}
