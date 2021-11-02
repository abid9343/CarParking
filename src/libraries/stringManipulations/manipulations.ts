export function MakeTopic(name: any) {
  try {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = 5;
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const without_space_name: string = String(SpaceRemove(name));
    const topic_name: string = without_space_name + '-' + result;

    return topic_name;
  } catch (error) {
    console.log('The MakeTopic is: ', error);
  }
}
export function SpaceRemove(name: any) {
  try {
    const space_remove = name.split(' ').join('');
    return space_remove;
  } catch (error) {
    console.log('The SpaceRemove is: ', error);
  }
}
