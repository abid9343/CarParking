import { CompanyDTO } from '../../models/classes/index';
import { DALayer } from '../../dataAccessLayers/DAL';

const DbManager = DALayer.getInstance();
export class CompanyManager {
  private static instance: CompanyManager;

  //#region "singleton design pattern"

  /**
   * The CompanyManager's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the CompanyManager instance.
   *
   * This implementation let you subclass the CompanyManager class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): CompanyManager {
    if (!CompanyManager.instance) {
      CompanyManager.instance = new CompanyManager();
    }

    return CompanyManager.instance;
  }

  /**
   * Finally, any CompanyManager should define some business logic, which can be
   * executed on its instance.
   */
  //#endregion "END"

  //#region "Function"

  public AddCompany = async (DTO: CompanyDTO) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        let dbData: any = await DbManager.AddCompany(DTO);
        for (let i = 0; DTO.companyDetails.length > i; i++) {
          const companyDetails = DTO.companyDetails[i];
          await DbManager.AddCompanyDeatils(companyDetails, dbData);
        }
        const result = Object.assign({ company_id: dbData }, DTO);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
  public UpdateDiscount = async (DTO: CompanyDTO) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        // let dbData: any = await DbManager.UpdateDiscount(DTO);
        // resolve(dbData);
      } catch (error) {
        reject(error);
      }
    });
  };
  public DeleteDiscount = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        let dbData: any = await DbManager.DeleteDiscount(id);
        resolve(dbData);
      } catch (error) {
        reject(error);
      }
    });
  };
  //#endregion "END"
}
