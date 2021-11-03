import { CompanyDetailsDTO } from './companyDetailsDTO';
export class CompanyDTO {
  public id: number | undefined;
  public name: string | undefined;
  public email: string | undefined;
  public isactive: number | undefined;
  public legal_name: string | undefined;
  public complaint_email: string | undefined;
  public complain_number: string | undefined;
  public phone: string | undefined;
  public millagedescription: string | undefined;
  public description: string | undefined;
  public logo_name: string | undefined;
  public company_info: string | undefined;
  public term_conditions: string | undefined;
  public procedure: string | undefined;
  public short_description: string | undefined;
  public created_by: number | undefined;
  public updated_by: number | undefined;
  public on_created: string | undefined;
  public companyDetails: CompanyDetailsDTO[] = [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
