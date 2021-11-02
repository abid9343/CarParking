const admin = require('firebase-admin');
const serviceAccount = require('../../jsons/pushConfig/firebase-push-google-services.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://fir-meet-people.firebaseio.com',
});

export class RequestPushClient {
  private static instance: RequestPushClient;

  //#region "singleton design pattern"

  /**
   * The RequestPushClient's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the RequestPushClient instance.
   *
   * This implementation let you subclass the RequestPushClient class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): RequestPushClient {
    if (!RequestPushClient.instance) {
      RequestPushClient.instance = new RequestPushClient();
    }

    return RequestPushClient.instance;
  }

  /**
   * Finally, any RequestPushClient should define some business logic, which can be
   * executed on its instance.
   */
  //#endregion "END"

  //#region "Function"

  /**
   * Enum of push payload 
   *  type 
   *        1---> general 
   *        2-->  brand
   */

  public Generic_Push_Notifcation = async (token: [], payload: any) => {
    console.log(
      '=====================Generic_Push_Notifcation Function =================='
    );

    try {
      const message = {
        tokens: token,

        android: {
          priority: 'high',
        },
        data: payload,
      };
      //  console.log('message', message);
      admin
        .messaging()
        .sendMulticast(message)
        .then((response: any) => {
          if (response.failureCount > 0) {
            const failedTokens: [] = [];
            response.responses.forEach((resp: any, idx: any) => {
              console.log(
                'List of tokens that caused success: ' + resp.success
              );

              if (!resp.success) {
                failedTokens.push(token[idx]);
              }
            });
            console.log('List of tokens that caused failures: ' + failedTokens);
          }
        });
    } catch (error) {
      console.log('=====================error==================', error);
    }
  };
  public Generic_Push_Notifcation_Singal = async (
    token: string,
    payload: any
  ) => {
    console.log(
      '=====================Generic_Push_NotifcationDONE Function =================='
    );
    try {
      const message = {
        token: token,
        //'dHq2BDm2Qu2wd4cuZQXgqH:APA91bGMH0-sgnWuSxwO-Z0ZpqDwi8mCGc8DGJlLHRXZfy9UkYua_qdNqr-4_C0KqN6opB7qEYks0Fm6tRg5YLypr0UI30zVYjMy95LPMPXxoj1zgO0H1jmA-YZhU4Gb_HUpMhl2iR-R',
        android: {
          priority: 'high',
        },
        data: payload,
      };
      //  console.log('message', message);

      admin
        .messaging()
        .send(message)
        .then((response: any) => {
          console.log('Successfully sent message:', response);

          // Response is a message ID string.
        })
        .catch((error: any) => {
          console.log('fails', error);
        });
    } catch (error) {
      console.log('=====================error==================', error);
    }
  };

  public Topic_Notifcation = async (topic_name: string, payload: any) => {
    return new Promise(async (resolve, reject) => {
      console.log(
        '=====================Topic_Notifcation Function =================='
      );
      try {
        const message = {
          data: payload,
          topic: topic_name,
        };
        //  console.log('message', message);
        admin
          .messaging()
          .send(message)
          .then((response: any) => {
            console.log('Successfully sent message:', response);
            return resolve(`Successfully sent message: ${response}`);
          })
          .catch((error: any) => {
            console.log('Error sending message:', error);
            return reject(`Error sending message: ${error}`);
          });
      } catch (error) {
        console.log('=====================error==================', error);
        return reject(`Error  message: ${error}`);
      }
    });
  };

  public Create_Post_Notification = async (topic_name: string, payload: any) => {
    return new Promise(async (resolve, reject) => {
      console.log(
        '=====================Create_Post_Notification Function =================='
      );
      try {
        const message = {
          data: payload,
          topic: topic_name,
        };
        //  console.log('message', message);
        admin
          .messaging()
          .send(message)
          .then((response: any) => {
            console.log('Successfully sent message:', response);
            return resolve(`Successfully sent message: ${response}`);
          })
          .catch((error: any) => {
            console.log('Error sending message:', error);
            return reject(`Error sending message: ${error}`);
          });
      } catch (error) {
        console.log('=====================error==================', error);
        return reject(`Error  message: ${error}`);
      }
    });
  };
  //#endregion "END"
}
