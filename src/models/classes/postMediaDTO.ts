export class PostMediaDTO {
  public media_id: number | undefined;
  public post_id: number | undefined;
  public caption: string | undefined;
  public path: string | undefined;
  public file_name: string | undefined;
  public thumbnail: string | undefined;
  public type: number | undefined;
  public height: number | undefined;
  public width: number | undefined;
  public size: number | undefined;
  public on_created: string | undefined;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
