import { Artical } from '../artical.interface';
export class ReqGetArticals {
  page: number;
  pageSize: number;
}
export class ResGetArticals {
  total: number;
  articalList: Artical[];
}
