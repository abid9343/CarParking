export class DiscountDTO {
 
  public id: number | undefined;
  public code: string | undefined;
  public discount: string | undefined;
  public type: number | undefined;
  public start_date: string | undefined;
  public end_date: string | undefined;
  public used: string | undefined;
  public status: string | undefined;
  public vender_id: number | undefined;
  public airport_id: number | undefined;
  public on_created: string | undefined;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
