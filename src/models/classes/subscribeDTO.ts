export class SubscribeDTO {
    public subscribe_id: number | undefined;
    public user_id: number | undefined;
    public brand_id: number | undefined;
    public on_created: string | undefined;
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }
  