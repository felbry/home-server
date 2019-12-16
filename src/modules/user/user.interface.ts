import { Base } from '../base.interface';
export class User extends Base {
  username: string;
  password: string;
  nickName: string;
  gender: number;
}
