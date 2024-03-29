export class CompanyDetailsDTO {
  public airPort_id: number | undefined;
  public start_off_time: number | undefined;
  public end_off_time: number | undefined;
  public car_valeting_rate: number | undefined;
  public four_valeting_rate: number | undefined;
  public mini_bus_valeting_vate: number | undefined;
  public rating: number | undefined;
  public commision: number | undefined;
  public isactive: number | undefined;
  public short_notice_hours: number | undefined;
  public edit_short_notice_hours: number | undefined;
  public cancel_short_notice_hours: number | undefined;
  public rating_percentage: number | undefined;
  public company_type: number | undefined;
  public offer_type: number | undefined;
  public sequence: number | undefined;
  public hr_patrols: number | undefined;
  public cctv: number | undefined;
  public fencing: number | undefined;
  public keep_your_keys: number | undefined;
  public security_lighting: number | undefined;
  public secure_barrier: number | undefined;
  public patrolled: number | undefined;
  public park_mark: number | undefined;
  public disability_friendly: number | undefined;
  public bpa_member: number | undefined;
  public buy_with_confidence: number | undefined;
  public start_time: number | undefined;
  public created_by: number | undefined;
  public updated_by: number | undefined;
  public on_created: string | undefined;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
