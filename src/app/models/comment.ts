import {Config} from '../app.constants';

import {User} from './user';

export class Comment {
  public _id: string;
  public comment: string;
  public owner: User;

  public constructor(data: any = {}) {
    this._id = data._id || '';
    this.comment = data.comment || '';
    this.owner = new User(data.owner);
  }

}
