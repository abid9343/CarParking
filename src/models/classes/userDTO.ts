export class UserDTO {
  public user_id: number | undefined;
  public name: string | undefined;
  public caption: string | undefined;
  public email: string | undefined;
  public gender: string | undefined;
  public username: string | undefined;
  public password: string | undefined;
  public avatar_url: string | undefined;
  public on_created: string | undefined;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
