import { timestampUtc } from '../libraries/timestamp/timestamp';
import {
  AirPortDTO,
  DiscountDTO,
  CompanyDTO,
  CompanyDetailsDTO,
} from '../models/classes/index';
import { MakeTopic } from '../libraries/stringManipulations/manipulations';
const moment = require('moment');
const pool = require('./MySQLConnection');
const timestamp: any = String(timestampUtc());
const momentTime: any = moment().format();
export class DALayer {
  private static instance: DALayer;
  //#region "singleton design pattern"
  /**
   * The DALayer's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the DALayer instance.
   *
   * This implementation let you subclass the DALayer class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): DALayer {
    if (!DALayer.instance) {
      DALayer.instance = new DALayer();
    }

    return DALayer.instance;
  }

  /**
   * Finally, any DALayer should define some business logic, which can be
   * executed on its instance.
   */
  //#endregion "END"

  //#region "=========================AirPort========================"

  public AirportDetails = async (id: number) => {
    return new Promise((resolve, reject) => {
      let select_query: string;

      if (id != 0) {
        select_query = `SELECT * FROM airPort  WHERE id = ${id} AND active = 1`;
      } else {
        // Trending Brand list
        select_query = `SELECT * FROM airPort WHERE active = 1;`;
      }
      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(id ? results[0] : results);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  public CreateAirport = async (DTO: AirPortDTO) => {
    return new Promise((resolve, reject) => {
      const comment = {
        name: DTO.name,
        terminal1: DTO.terminal1,
        terminal2: DTO.terminal2,
        terminal3: DTO.terminal3,
        terminal4: DTO.terminal4,
        terminal5: DTO.terminal5,
        active: DTO.active,
        on_created: momentTime,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO airPort SET ?;`;

      pool.query(
        insert_query,
        comment,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  public UpdateAirPort = async (DTO: AirPortDTO) => {
    return new Promise((resolve, reject) => {
      const update_query: string = ` UPDATE airPort SET name= '${DTO.name}',terminal1='${DTO.terminal1}',terminal2='${DTO.terminal2}',terminal4='${DTO.terminal4}',terminal3='${DTO.terminal3}',terminal5='${DTO.terminal5}' ,active =${DTO.active} WHERE id='${DTO.id}';
      `;

      pool.query(
        update_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  public DeleteAirPort = async (id: number) => {
    return new Promise((resolve, reject) => {
      const update_query: string = ` DELETE * FROM airPort WHERE id='${id}';
      ;`;

      pool.query(
        update_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  //#endregion "=========================END========================"

  //#region "=========================Discount========================"

  public DiscountDetails = async (id: number) => {
    return new Promise((resolve, reject) => {
      let select_query: string;

      if (id != 0) {
        select_query = `SELECT * FROM discount  WHERE id = ${id} AND active = 1`;
      } else {
        // Trending Brand list
        select_query = `SELECT * FROM discount WHERE active = 1;`;
      }
      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(id ? results[0] : results);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };

  public CreateDiscount = async (DTO: DiscountDTO) => {
    /**
     * Type
     * percentage
     * amount
     */
    return new Promise((resolve, reject) => {
      const comment = {
        code: DTO.code,
        discount: DTO.discount,
        type: DTO.type,
        start_date: DTO.start_date,
        end_date: DTO.end_date,
        used: DTO.used,
        status: DTO.status,
        vender_id: DTO.vender_id,
        airport_id: DTO.airport_id,
        on_created: momentTime,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO discount SET ?;`;

      pool.query(
        insert_query,
        comment,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  public UpdateDiscount = async (DTO: DiscountDTO) => {
    return new Promise((resolve, reject) => {
      const update_query: string = ` UPDATE discount SET code= '${DTO.code}',discount='${DTO.discount}',type='${DTO.type}',start_date='${DTO.start_date}',end_date='${DTO.end_date}',status='${DTO.status}' ,used =${DTO.used},vender_id =${DTO.vender_id},airport_id =${DTO.airport_id} WHERE id='${DTO.id}';
      `;

      pool.query(
        update_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  public DeleteDiscount = async (id: number) => {
    return new Promise((resolve, reject) => {
      const update_query: string = ` DELETE * FROM discount WHERE id='${id}';
      ;`;

      pool.query(
        update_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  //#endregion "=========================END========================"

  //#region "=============================Company======================="

  public AddCompany = async (DTO: CompanyDTO) => {
    return new Promise((resolve, reject) => {
      const comment = {
        name: DTO.name,
        email: DTO.email,
        isactive: DTO.isactive,
        legal_name: DTO.legal_name,
        complain_number: DTO.complain_number,
        complaint_email: DTO.complaint_email,
        phone: DTO.phone,
        millagedescription: DTO.millagedescription,
        logo_name: DTO.logo_name,
        company_info: DTO.company_info,
        term_conditions: DTO.term_conditions,
        procedure: DTO.procedure,
        created_by: DTO.created_by,
        updated_by: DTO.updated_by,
        on_created: momentTime,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO company SET ?;`;

      pool.query(
        insert_query,
        comment,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  public AddCompanyDeatils = async (
    DTO: CompanyDetailsDTO,
    company_id: number
  ) => {
    return new Promise((resolve, reject) => {
      const comment = {
        company_id: company_id,
        airPort_id: DTO.airPort_id,
        start_off_time: DTO.start_off_time,
        car_valeting_rate: DTO.car_valeting_rate,
        end_off_time: DTO.end_off_time,
        four_valeting_rate: DTO.four_valeting_rate,
        mini_bus_valeting_vate: DTO.mini_bus_valeting_vate,
        rating: DTO.rating,
        commision: DTO.commision,
        isactive: DTO.isactive,
        short_notice_hours: DTO.short_notice_hours,
        edit_short_notice_hours: DTO.edit_short_notice_hours,
        cancel_short_notice_hours: DTO.cancel_short_notice_hours,
        rating_percentage: DTO.rating_percentage,
        company_type: DTO.company_type,
        offer_type: DTO.offer_type,
        sequence: DTO.sequence,
        hr_patrols: DTO.hr_patrols,
        cctv: DTO.cctv,
        fencing: DTO.fencing,
        keep_your_keys: DTO.keep_your_keys,
        security_lighting: DTO.security_lighting,
        secure_barrier: DTO.secure_barrier,
        patrolled: DTO.patrolled,
        park_mark: DTO.park_mark,
        disability_friendly: DTO.disability_friendly,
        bpa_member: DTO.bpa_member,
        buy_with_confidence: DTO.buy_with_confidence,
        start_time: DTO.start_time,
        created_by: DTO.company_type,
        updated_by: DTO.updated_by,
        on_created: momentTime,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO companyDeatils SET ?;`;

      pool.query(
        insert_query,
        comment,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  public UpdateCompany = async (DTO: CompanyDTO) => {
    return new Promise((resolve, reject) => {
      const comment = {
        name: DTO.name,
        email: DTO.email,
        isactive: DTO.isactive,
        legal_name: DTO.legal_name,
        complain_number: DTO.complain_number,
        complaint_email: DTO.complaint_email,
        phone: DTO.phone,
        millagedescription: DTO.millagedescription,
        logo_name: DTO.logo_name,
        company_info: DTO.company_info,
        term_conditions: DTO.term_conditions,
        procedure: DTO.procedure,
        created_by: DTO.created_by,
        updated_by: DTO.updated_by,
        on_created: momentTime,
        //on_created: timestamp,
      };

      const update_query: string = `UPDATE company
      SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
      WHERE CustomerID = 1;`;

      pool.query(
        update_query,

        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results.insertId);
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  //#endregion
}
