import { BaseAndTimestamp } from '../../base.interface';
export class ReqGetArticalsById {
  isOrigin: boolean;
}
export class ResGetArticalsById extends BaseAndTimestamp {
  articalList: Artical[];
}
