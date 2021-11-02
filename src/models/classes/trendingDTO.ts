export class TrendingDTO {
  public trending_id: number | undefined;
  public brand_id: number | undefined;
  public user_id: number | undefined;
  public is_reach: number | undefined;
  public is_impression: number | undefined;
  public is_type: number | undefined;

  public on_created: string | undefined;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
