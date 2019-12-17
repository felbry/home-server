import { Artical } from '../artical.interface';
import { Pagination } from '../../pagination.interface';
import { Total } from '../../total.interface';
export class ReqGetArticals extends Pagination {}
export class ResGetArticals extends Total {
  articalList: Artical[];
}
