import {Config} from '../app.constants';

export class Report {
  public _id: string;
  public name: string;
  public email: string;
  public description: string;
  public approved: boolean =  false;

  public constructor(data: any = {}) {
    this._id = data._id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.description = data.description || '';
    this.approved = data.approved || '';
  }

  public getID(){
    return this._id;
  }

}
