export class Base {
  _id: string;
  __v: number;
}
export class BaseAndTimestamp extends Base {
  createdAt: string;
  updatedAt: string;
}
