import {Config} from '../app.constants';

import {User} from './user';
import {Category} from './category';

export class Video {
  public _id: string;
  public name: string;
  public description: string;
  public thumb: string;
  public views: number;
  public owner: User;
  public category: Category;
  public createdAt: string;

  public constructor(data: any = {}) {
    this._id = data._id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.thumb = data.thumb || '';
    this.views = data.views || '';
    this.owner = new User(data.owner);
    this.category = new Category(data.category);
    this.createdAt = data.createdAt || '';
  }

  public getID() {
    return this._id;
  }

  public getThumb() {
    return (this.thumb !== '') ? Config.API_UPLOADS_ENDPOINT + '/uploads/' + this.thumb : '';
  }
}
