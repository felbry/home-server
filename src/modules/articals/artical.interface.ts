import { BaseAndTimestamp } from '../base.interface';
import { User } from '../users/user.interface';
import { Afile } from '../afiles/afile.interface';
export class Artical extends BaseAndTimestamp {
  title: string;
  author: User;
  file: Afile;
}
