import { BaseAndTimestamp } from '../base.interface';
import { User } from '../users/user.interface';
import { File } from '../files/file.interface';
export class Artical extends BaseAndTimestamp {
  title: string;
  author: User;
  file: File;
}
