import { timestampUtc } from '../timestamp/timestamp';

const timestamp: any = String(timestampUtc());
export function AddkeyValueObjectsInArray(arrOfObj: any, keyValue: any) {
  var result = arrOfObj.map(function (el: any) {
    var o = Object.assign({}, el);
    o.post_id = keyValue;
    o.on_created = timestamp;
    return o;
  });
  return result;
}
export function AddkeyValueObjectsInArrayNotification(
  arrOfObj: any,
  keyValue: any
) {
  var result = arrOfObj.map(function (el: any) {
    var o = Object.assign({}, el);
    o.notification_id = keyValue;
    o.on_created = timestamp;
    return o;
  });
  return result;
}
export function ArrayConvertToCommonString(toUsers: any) {
  console.log(toUsers);
  let result = Array.prototype.map
    .call(toUsers, function (item) {
      return item.user_id;
    })
    .join(',');

  return result;
}
