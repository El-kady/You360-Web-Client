import {Config} from '../app.constants';

export class User {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: string;
  public image: string;
  public creationDate: string;
  public logged: boolean = false;

  public constructor(data: any = {}) {
    this._id = data._id || '';
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.role = (data.role) ? data.role.toLocaleLowerCase() : '';
    this.image = data.image || '';
    this.creationDate = data.creation_date || Date.now();
    this.logged = data.logged || false;
  }

  public getID(){
    return this._id;
  }

  public getName() {
    return this.firstName + ' ' + this.lastName;
  }

  public getImage() {
    return (this.image !== '') ? Config.API_UPLOADS_ENDPOINT + '/uploads/' + this.image : '';
  }
}
