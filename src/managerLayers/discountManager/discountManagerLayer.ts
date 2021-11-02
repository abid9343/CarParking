import { DiscountDTO } from "../../models/classes/index";
import { DALayer } from "../../dataAccessLayers/DAL";

const DbManager = DALayer.getInstance();
export class DiscountManager {
  private static instance: DiscountManager;

  //#region "singleton design pattern"

  /**
   * The DiscountManager's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the DiscountManager instance.
   *
   * This implementation let you subclass the DiscountManager class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): DiscountManager {
    if (!DiscountManager.instance) {
      DiscountManager.instance = new DiscountManager();
    }

    return DiscountManager.instance;
  }

  /**
   * Finally, any DiscountManager should define some business logic, which can be
   * executed on its instance.
   */
  //#endregion "END"

  //#region "Function"

  public DiscountDetails = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        const db_response: any = await DbManager.DiscountDetails(id);
        resolve(db_response);
      } catch (error) {
        reject(error);
      }
    });
  };
  public CreateDiscount = async (DTO: DiscountDTO) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        let dbData: any = await DbManager.CreateDiscount(DTO);

        const result = Object.assign({ comment_id: dbData }, DTO);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
  public UpdateDiscount = async (DTO: DiscountDTO) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        let dbData: any = await DbManager.UpdateDiscount(DTO);
        resolve(dbData);
      } catch (error) {
        reject(error);
      }
    });
  };
  public DeleteDiscount = async (id:number) => {
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
