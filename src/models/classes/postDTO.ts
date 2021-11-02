import { PostMediaDTO } from './postMediaDTO';

export class PostDTO {
  public post_id: number | undefined;
  public brand_id: number | undefined;
  public description: string | undefined;
  public location: string | undefined;
  public isComment_Allow: Boolean | undefined;
  public isReport: number | undefined;
  public latitude: number | undefined;
  public longitude: number | undefined;
  public on_created: string | undefined;
  public post_media: PostMediaDTO[] = [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
