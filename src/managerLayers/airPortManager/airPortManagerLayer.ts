import { AirPortDTO } from "../../models/classes/index";
import { DALayer } from "../../dataAccessLayers/DAL";

const DbManager = DALayer.getInstance();
export class AirPortManager {
  private static instance: AirPortManager;

  //#region "singleton design pattern"

  /**
   * The AirPortManager's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the AirPortManager instance.
   *
   * This implementation let you subclass the AirPortManager class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): AirPortManager {
    if (!AirPortManager.instance) {
      AirPortManager.instance = new AirPortManager();
    }

    return AirPortManager.instance;
  }

  /**
   * Finally, any AirPortManager should define some business logic, which can be
   * executed on its instance.
   */
  //#endregion "END"

  //#region "Function"

  public AirportDetails = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        const db_response: any = await DbManager.AirportDetails(id);
        resolve(db_response);
      } catch (error) {
        reject(error);
      }
    });
  };
  public CreateAirport = async (DTO: AirPortDTO) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        let dbData: any = await DbManager.CreateAirport(DTO);

        const result = Object.assign({ comment_id: dbData }, DTO);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };
  public UpdateAirPort = async (DTO: AirPortDTO) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        let dbData: any = await DbManager.UpdateAirPort(DTO);
        resolve(dbData);
      } catch (error) {
        reject(error);
      }
    });
  };
  public DeleteAirPort = async (id:number) => {
    return new Promise(async (resolve, reject) => {
      // Call DbManager Layer
      try {
        let dbData: any = await DbManager.DeleteAirPort(id);
        resolve(dbData);
      } catch (error) {
        reject(error);
      }
    });
  };
  //#endregion "END"
}
