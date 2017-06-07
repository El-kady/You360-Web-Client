export class Video {
    public _id: string;

    public constructor( data: any = {}) {
        this._id = data._id || '';
    }

}
