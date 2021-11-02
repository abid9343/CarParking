export class PostLikeDTO {
  public post_id: number | undefined;
  public like_id: number | undefined;
  public like_by: number | undefined;
  public like_type: number | undefined;
  public on_created: string | undefined;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
