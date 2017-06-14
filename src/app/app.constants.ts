import {Injectable} from '@angular/core';

@Injectable()
export class Config {
  public static API_ENDPOINT = 'http://localhost:3000';
  public static API_UPLOADS_ENDPOINT = 'http://localhost:3000';
  // public static API_ENDPOINT = 'https://you360.herokuapp.com';
  // public static API_UPLOADS_ENDPOINT = 'https://you360.herokuapp.com';
}
