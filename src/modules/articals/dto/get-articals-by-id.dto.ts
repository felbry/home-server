import { Artical } from '../../articals/artical.interface';

export class ReqGetArticalsById {
  isOrigin?: boolean;
}
export class ResGetArticalsById extends Artical {
  content: string;
}
