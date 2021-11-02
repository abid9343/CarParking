import { BrandDTO } from 'models/classes/discountDTO';
import { timestampUtc } from '../libraries/timestamp/timestamp';
import {
  PostDTO,
  PostCommentDTO,
  UserDTO,
  PostLikeDTO,
  FollowerDTO,
  SubscribeDTO,
  TrendingDTO,
} from '../models/classes/index';
import { MakeTopic } from '../libraries/stringManipulations/manipulations';
const pool = require('./MySQLConnection');
const timestamp: any = String(timestampUtc());
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

  //#region "=========================Post========================"

  public Post_Details = async (
    user_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `
      SELECT count(*) as total_count  FROM advt_post;

      SELECT P.post_id,
       P.brand_id,
       B.name  AS brand_name,
       P.description,
       P.location,
       B.topic  AS brand_topic,
       B.website_url,
       B.avatar_url,
       B.cover_url,
       (SELECT COUNT(*)  FROM advt_comment WHERE post_id = P.post_id) AS comment_count,
      (SELECT COUNT(*)  FROM advt_like WHERE post_id = P.post_id) AS like_count,
      IFNULL((SELECT status FROM advt_like WHERE post_id = P.post_id AND like_by =  ${user_id} ),0) AS like_by,
      IFNULL((SELECT status FROM advt_subscribe WHERE brand_id = B.brand_id AND user_id =  ${user_id} ),0) AS subscribe_by,
       P.on_created
       FROM advt_post AS P 
       INNER JOIN advt_post_media  AS M ON M.post_id = P.post_id 
       INNER JOIN advt_brand AS B  ON P.brand_id = B.brand_id WHERE M.type = 1 order by P.post_id desc LIMIT  ${skip_item} ,${page_size};
      
       SELECT 
            post_id, 
            post_media_id, 
            path, 
            file_name, 
            thumbnail, 
            type, 
            height,
            width,
            size,
            on_created 
       FROM  advt_post_media 
          WHERE  type = 1 AND   exists (SELECT post_id  FROM advt_post order by post_id desc LIMIT  ${skip_item} ,${page_size});
     `;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results);
        }
      );
    });
  };

  public Post_Details_Video = async (
    user_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `
      SELECT count(*) as total_count  FROM advt_post;

      SELECT P.post_id,
       P.brand_id,
       P.category_id,
       B.name  AS brand_name,
       P.description,
       P.location,
       B.topic  AS brand_topic,
       B.website_url,
       B.avatar_url,
       B.cover_url,
       (SELECT COUNT(*)  FROM advt_comment WHERE post_id = P.post_id) AS comment_count,
      (SELECT COUNT(*)  FROM advt_like WHERE post_id = P.post_id) AS like_count,
      IFNULL((SELECT status FROM advt_like WHERE post_id = P.post_id AND like_by =  ${user_id} ),0) AS like_by,
      IFNULL((SELECT status FROM advt_subscribe WHERE brand_id = B.brand_id AND user_id =  ${user_id} ),0) AS subscribe_by,
       P.on_created
       FROM advt_post AS P 
       INNER JOIN advt_post_media  AS M ON M.post_id = P.post_id 
       INNER JOIN advt_brand AS B  ON P.brand_id = B.brand_id WHERE M.type = 2 order by P.post_id desc LIMIT  ${skip_item} ,${page_size};
      
       SELECT 
            post_id, 
            post_media_id, 
            path, 
            file_name, 
            thumbnail, 
            type, 
            height,
            width,
            size,
            on_created 
       FROM  advt_post_media 
          WHERE  type = 2 AND   exists (SELECT post_id  FROM advt_post order by post_id desc LIMIT  ${skip_item} ,${page_size});
     `;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results);
        }
      );
    });
  };
  public Post_Details_V2 = async (
    category_id: number,
    user_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `
      SELECT count(*) as total_count  FROM advt_post WHERE category_id =${category_id} ;

      SELECT 
       P.post_id,
       P.category_id,
       P.brand_id,
       B.name  AS brand_name,
       P.description,
       P.location,
       B.topic  AS brand_topic,
       B.website_url,
       B.avatar_url,
       B.cover_url,
       (SELECT COUNT(*)  FROM advt_comment WHERE post_id = P.post_id) AS comment_count,
      (SELECT COUNT(*)  FROM advt_like WHERE post_id = P.post_id) AS like_count,
      IFNULL((SELECT status FROM advt_like WHERE post_id = P.post_id AND like_by =  ${user_id} ),0) AS like_by,
      IFNULL((SELECT status FROM advt_subscribe WHERE brand_id = B.brand_id AND user_id =  ${user_id} ),0) AS subscribe_by,
       P.on_created
       FROM advt_post AS P 
       INNER JOIN advt_post_media  AS M ON M.post_id = P.post_id 
       INNER JOIN advt_brand AS B  ON P.brand_id = B.brand_id 
       WHERE P.category_id =${category_id} order by P.post_id desc LIMIT  ${skip_item} ,${page_size};
      
       SELECT 
            post_id, 
            post_media_id, 
            path, 
            file_name, 
            thumbnail, 
            type, 
            height,
            width,
            size,
            on_created 
       FROM  advt_post_media 
          WHERE   exists (SELECT post_id  FROM advt_post WHERE category_id =${category_id}  order by post_id desc LIMIT  ${skip_item} ,${page_size});
     `;
      console.log(select_query);
      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results);
        }
      );
    });
  };
  public Post_Details_With_Comment = async (
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `
      SELECT count(*) as total_count  FROM advt_post;

      SELECT P.post_id,
       P.brand_id,
       P.category_id,
       B.name  AS brand_name,
       P.description,
       P.location, 
       B.website_url,
       B.avatar_url,
       (SELECT COUNT(*)  FROM advt_comment WHERE post_id = P.post_id) AS comment_count,
       (SELECT COUNT(*)  FROM advt_like WHERE post_id = P.post_id) AS like_count,
       P.on_created
       FROM advt_post AS P 
      INNER JOIN advt_brand AS B  ON P.brand_id = B.brand_id  LIMIT  ${skip_item} ,${page_size};
      
       SELECT 
            post_id, 
            post_media_id, 
            path, 
            file_name, 
            thumbnail, 
            type, 
            on_created 
            FROM  advt_post_media WHERE  exists (SELECT post_id  FROM advt_post LIMIT  ${skip_item} ,${page_size});

            SELECT
            C.post_id, 
            C.comment_id,
            C.content,
        -- (SELECT name  FROM advt_user WHERE user_id = C.created_by) AS user_name,
            U.name AS user_name,
            U.avatar_url,
            C.on_created 
            
            FROM advt_comment AS C INNER JOIN advt_user AS U ON U.user_id = C.created_by  WHERE  exists (SELECT post_id  FROM advt_post LIMIT  ${skip_item} ,${page_size});
     `;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results);
        }
      );
    });
  };
  public Create_Post = async (DTO: PostDTO) => {
    return new Promise((resolve, reject) => {
      const post = {
        brand_id: DTO.brand_id,
        description: DTO.description,
        location: DTO.location,
        isComment_Allow: DTO.isComment_Allow,
        isReport: DTO.isReport,
        latitude: DTO.latitude,
        longitude: DTO.longitude,

        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO advt_post SET ?;`;

      pool.query(
        insert_query,
        post,
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
  //#region "=========================Comment========================"

  public Comment_Details = async (
    post_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query2: string = `SELECT C.comment_id, C.content, U.name AS user_name, U.avatar_url, C.on_created FROM advt_comment AS C INNER JOIN advt_user AS U  ON C.created_by = U.user_id WHERE C.post_id = ${post_id}  AND C.parent_comment_Id = 0 LIMIT ${skip_item} ,${page_size};
      SELECT C.comment_id as 'reply_id', C.content, U.name AS user_name, C.parent_comment_Id, U.avatar_url, C.on_created FROM advt_comment AS C INNER JOIN advt_user AS U ON C.created_by = U.user_id WHERE  exists ( SELECT comment_id  FROM advt_comment WHERE post_id = ${post_id}  LIMIT  ${skip_item} ,${page_size});`;
      const select_query: string = `SELECT C.post_id ,C.comment_id, C.content, U.name AS user_name, U.avatar_url, C.on_created FROM advt_comment AS C INNER JOIN advt_user AS U  ON C.created_by = U.user_id WHERE C.post_id = ${post_id}  AND C.parent_comment_Id = 0 LIMIT ${skip_item} ,${page_size};
     `;

      pool.query(
        select_query,
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
  public Create_Comment = async (DTO: PostCommentDTO) => {
    return new Promise((resolve, reject) => {
      /**
       * Enum comment_type
       * post comment --> 1
       * comment reply --> 2
       */

      const comment = {
        post_id: DTO.post_id,
        content: DTO.content,
        parent_comment_Id: 0, //DTO.parent_comment_Id,
        type: 1, //DTO.type,
        created_by: DTO.created_by,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO advt_comment SET ?;`;

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
  public Create_Comment_Reply = async (DTO: PostCommentDTO) => {
    return new Promise((resolve, reject) => {
      /**
       * Enum comment_type
       * post comment --> 1
       * comment reply --> 2
       */

      const comment = {
        post_id: DTO.post_id,
        content: DTO.content,
        parent_comment_Id: DTO.comment_id,
        type: 2, //DTO.type,
        created_by: DTO.created_by,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO advt_comment SET ?;`;

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
  //#endregion "=========================END========================"
  //#region "=========================User========================"
  public IFUserExit = async (email: string) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const select_query: string = `SELECT   email ,user_id FROM advt_user WHERE email = '${email}';`;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results[0]);
        }
      );
    });
  };
  public Create_User = async (DTO: UserDTO) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const user = {
        name: DTO.name,
        caption: DTO.caption,
        gender: DTO.gender,
        email: DTO.email,
        username: DTO.username,
        password: DTO.password,
        avatar_url: DTO.avatar_url,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO advt_user SET ?;`;

      pool.query(
        insert_query,
        user,
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
  public Update_User = async (DTO: UserDTO) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const update_query: string = `
      
      UPDATE advt_user SET name= '${DTO.name}',caption='${DTO.caption}',gender='${DTO.gender}',username='${DTO.username}',password='${DTO.password}',avatar_url='${DTO.avatar_url}' WHERE email='${DTO.email}';
          `;

      pool.query(
        update_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          // console.log('The solution is: ',results.user_id);
          resolve(true);
        }
      );
    });
  };
  public User_Device_Token = async (user_id: number, device_token: string) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const update_query: string = `UPDATE advt_user SET device_token = '${device_token}' WHERE user_id = ${user_id} ;`;

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

  //#endregion "=========================END========================"
  //#region "=========================Like========================"

  public Create_Like = async (DTO: PostLikeDTO) => {
    return new Promise((resolve, reject) => {
      /**
      const like = {
        post_id: DTO.post_id,
        like_by: DTO.like_by,
        like_type: 1, //DTO.like_type,
        //on_created: timestamp,
      };
   */
      const insert_query: string = `INSERT INTO advt_like(post_id, like_by,like_type,status) 
      SELECT ${DTO.post_id}, ${DTO.like_by}, ${1}, ${1}
        FROM dual 
        WHERE NOT EXISTS 
          (SELECT * FROM  advt_like 
             WHERE post_id=${DTO.post_id} AND like_by = ${DTO.like_by} );`;
      pool.query(
        insert_query,
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
  public Remove_Like = async (post_id: number, like_by: number) => {
    return new Promise((resolve, reject) => {
      const delete_query: string = `DELETE FROM advt_like WHERE post_id =${post_id} AND like_by =${like_by};`;
      pool.query(
        delete_query,
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
  public Like_Details = async (
    post_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `SELECT L.like_id, L.post_id, U.name AS user_name,  U.avatar_url, L.on_created FROM advt_like AS L INNER JOIN advt_user AS U  ON L.like_by = U.user_id WHERE L.post_id = ${post_id}  LIMIT ${skip_item} ,${page_size};`;
      pool.query(
        select_query,
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
  //#endregion "=========================END========================"

  //#region "=========================Brand========================"

  public ALL_Brand_List = async () => {
    return new Promise((resolve, reject) => {
      // same reply data save
      let select_query: string;

      select_query = `SELECT  brand_id,name FROM advt_brand `;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  };
  public Create_Brand = async (DTO: BrandDTO) => {
    return new Promise((resolve, reject) => {
      const barand_name: string = String(DTO.name);
      const topic_name: string = String(MakeTopic(barand_name.substring(0, 2)));

      // same reply data save

      const brand = {
        name: DTO.name,
        caption: DTO.caption,
        categroy: DTO.categroy,
        username: DTO.username,
        password: DTO.password,
        avatar_url: DTO.avatar_url,
        email: DTO.email,
        address: DTO.address,
        phone_no: DTO.phone_no,
        ptcl_no: DTO.ptcl_no,
        website_url: DTO.website_url,
        topic: topic_name,
        cover_url: DTO.cover_url,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO advt_brand SET ?;`;

      pool.query(
        insert_query,
        brand,
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
  public Brand_Details = async (
    brand_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      // same reply data save
      let select_query: string;

      if (brand_id != 0) {
        select_query = `SELECT brand_id,
        category_id,
        'Pakistan' as location,
        categroy,
        email,
        name,
        caption,
        address,
        phone_no,
        ptcl_no,
        username,
        cover_url,
        website_url,
        avatar_url,
        topic,
        topic AS brand_topic FROM advt_brand  WHERE brand_id = ${brand_id}`;
      } else {
        // Trending Brand list 
        select_query = `SELECT  brand_id,
        category_id,
        'Pakistan' as location,
        categroy,
        email,
        name,
        caption,
        address,
        phone_no,
        ptcl_no,
        username,
        cover_url,
        website_url,
        avatar_url,
        topic,
        topic AS brand_topic
         FROM advt_brand   ORDER BY RAND() DESC  LIMIT 20;`;
      }
      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(brand_id ? results[0] : results);
        }
      );
    });
  };
  public Brand_Details_V2 = async (skip_item: number, page_size: number) => {
    return new Promise((resolve, reject) => {
      // same reply data save
      let select_query: string;
// ALL Brand Details 
      select_query = `
                    SELECT count(*) as total_count  FROM advt_brand;
       
                    SELECT 
                    brand_id,
                    category_id,
                    'Pakistan' as location,
                    categroy,
                    email,
                    name,
                    caption,
                    address,
                    phone_no,
                    ptcl_no,
                    username,
                    cover_url,
                    website_url,
                    avatar_url,
                    topic,
                    topic AS brand_topic,
                    (SELECT count(*) as total_count  FROM advt_post WHERE brand_id = B.brand_id) as total_count_post,
                    (SELECT count(*) as total_count  FROM advt_followers WHERE brand_id = B.brand_id) as total_count_followers
              FROM
                advt_brand AS B  ORDER BY B.brand_id DESC  LIMIT ${skip_item} ,${page_size};`;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  };
  public Brand_Profile_Details = async (brand_id: number) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `

      SELECT 
            brand_id,
            email,
            'Pakistan' as location,
            category_id,
            name,
            caption,
            address,
            phone_no,
            ptcl_no,
            username,
            cover_url,
            website_url,
            topic,
            topic AS brand_topic,
            IFNULL(avatar_url,'') AS avatar_url,
            topic AS brand_topic,
            (SELECT count(*) as total_count  FROM advt_post WHERE brand_id = B.brand_id) as total_count_post,
            (SELECT count(*) as total_count  FROM advt_followers WHERE brand_id = B.brand_id) as total_count_followers
      FROM
        advt_brand AS B WHERE brand_id = ${brand_id};
           `;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results[0]);
        }
      );
    });
  };
  public Brand_Post_Details = async (
    brand_id: number,
    user_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `
      SELECT count(*) as total_count  FROM advt_post WHERE  brand_id = ${brand_id} ;

      SELECT P.post_id,
      'Pakistan' as location,
       B.brand_id,
       B.category_id,
       B.email,
       B.caption,
       B.categroy,
       B.address,
       B.phone_no,
       B.ptcl_no,
       B.username,
       B.name  AS brand_name,
       P.description,
       P.location, 
       B.topic  AS brand_topic,
       B.cover_url,
       B.website_url,
       B.avatar_url,
       IFNULL((SELECT status FROM advt_like WHERE post_id = P.post_id AND like_by =  ${user_id} ),0) AS like_by,
       IFNULL((SELECT status FROM advt_subscribe WHERE brand_id = B.brand_id AND user_id =  ${user_id} ),0) AS subscribe_by,
       (SELECT count(*) as total_count  FROM advt_post WHERE brand_id = B.brand_id) as total_count_post,
       (SELECT COUNT(*)  FROM advt_comment WHERE post_id = P.post_id) AS comment_count,
      (SELECT COUNT(*)  FROM advt_like WHERE post_id = P.post_id) AS like_count,
       P.on_created
       FROM advt_post AS P 
      INNER JOIN advt_brand AS B  ON P.brand_id = B.brand_id  WHERE  B.brand_id = ${brand_id} order by P.post_id desc LIMIT  ${skip_item} ,${page_size};
      
       SELECT 
            post_id, 
            post_media_id, 
            path, 
            file_name, 
            thumbnail, 
            type, 
            height,
            width,
            size,
            on_created 
            FROM  advt_post_media WHERE  exists (SELECT post_id  FROM advt_post  WHERE brand_id = ${brand_id} order by post_id desc LIMIT  ${skip_item} ,${page_size});
     `;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results);
        }
      );
    });
  };
  //#endregion "=========================END========================"

  //#region "=========================Followers========================"

  public Create_Followers = async (DTO: FollowerDTO) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const follower = {
        brand_id: DTO.brand_id,
        user_id: DTO.user_id,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO advt_followers SET ?;`;

      pool.query(
        insert_query,
        follower,
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
  public Follower_Details = async (
    brand_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      // same reply data save
      let select_query: string = ` SELECT count(*) as total_count  FROM advt_followers WHERE brand_id =${brand_id};
      
      SELECT F.followers_id,
       F.brand_id,
       F.user_id,
       B.name  AS user_name,
       B.avatar_url,   
       F.on_created
       FROM advt_followers AS F 
      INNER JOIN advt_user AS B  ON F.user_id = B.user_id   WHERE  F.brand_id LIMIT  ${skip_item} ,${page_size};`;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          resolve(brand_id ? results[0] : results);
        }
      );
    });
  };

  //#endregion "=========================END========================"
  //#region "=========================Subscribe========================"

  public Create_Subscribes = async (DTO: SubscribeDTO) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const subscribe = {
        brand_id: DTO.brand_id,
        user_id: DTO.user_id,
        status: 1,
        //on_created: timestamp,
      };

      const insert_query: string = `INSERT INTO advt_subscribe SET ?;`;

      pool.query(
        insert_query,
        subscribe,
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
  public Un_Subscribes = async (subscribe_id: number) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const delete_query: string = `DELETE FROM advt_subscribe WHERE subscribe_id = ${subscribe_id};`;

      pool.query(
        delete_query,

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
  public Subscribes_Details = async (
    user_id: number,
    skip_item: number,
    page_size: number
  ) => {
    return new Promise((resolve, reject) => {
      // same reply data save

      const delete_query: string = `
              SELECT count(*) as total_count  FROM advt_subscribe WHERE user_id = ${user_id};
                SELECT
                      S.subscribe_id,
                      B.brand_id,
                      U.user_id,
                      U.name  AS user_name,
                      B.name  AS brand_name,
                    --  B.topic  AS brand_topic,
                    --  B.website_url,
                      B.avatar_url AS brand_avatar_url,
                      U.avatar_url AS user_avatar_url
                FROM advt_subscribe AS S 
                     INNER JOIN advt_brand AS B  ON S.brand_id = B.brand_id 
                     INNER JOIN advt_user AS U  ON S.user_id = U.user_id 
                          WHERE S.user_id = ${user_id} LIMIT  ${skip_item} ,${page_size};`;

      pool.query(
        delete_query,

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

  public Get_ALL_USER_Device_Token = async (user_ids: string) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `SELECT  GROUP_CONCAT(device_token) as device_token  FROM user WHERE user_id In (${user_ids}) AND device_token != '';`;
      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          // console.log('The solution is: ', results[0].device_token);
          resolve(results[0].device_token || '');
          // console.log('The solution is: ', results[0]);
        }
      );
    });
  };
  //#endregion "=========================END========================"
  //#region "=========================Brand========================"

  public Is_Exist_Trending = async (
    brand_id: number,
    user_id: number,
    is_type: number
  ) => {
    return new Promise((resolve, reject) => {
      const select_query: string = `
      SELECT 
         trending_id,
         is_reach,
         is_impression
      FROM
         advt_trending  WHERE brand_id = ${brand_id} AND user_id = ${user_id} AND is_type = ${is_type} ;
           `;

      pool.query(
        select_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results[0]);
        }
      );
    });
  };
  public Insert_Trending = async (DTO: TrendingDTO) => {
    return new Promise((resolve, reject) => {
      const trending = {
        brand_id: DTO.brand_id,
        user_id: DTO.user_id,
        is_impression: 1, //DTO.is_impression,
        is_reach: 1, //DTO.is_reach,
        is_type: DTO.is_type,
      };
      const insert_query: string = `INSERT INTO advt_trending SET ?;`;

      pool.query(
        insert_query,
        trending,
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
  public Update_Trending = async (
    trending_id: number,

    is_impression: number
  ) => {
    return new Promise((resolve, reject) => {
      const update_query: string = `
      UPDATE  advt_trending  SET   is_impression = ${is_impression}  WHERE trending_id = ${trending_id} ;
           `;

      pool.query(
        update_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results[0]);
        }
      );
    });
  };
  public GET = async (brand_id: number) => {
    return new Promise((resolve, reject) => {
      const update_query: string = `
      SELECT sum(is_reach) AS is_reach , sum(is_impression) AS is_impression  FROM advt_trending  WHERE brand_id = ${brand_id} ;
           `;

      pool.query(
        update_query,
        function (error: any, results: any, fields: any) {
          if (error) {
            return reject(error);
          }
          //  console.log('The solution is: ', results);
          resolve(results[0]);
        }
      );
    });
  };

  //#endregion "=========================END========================"
}
