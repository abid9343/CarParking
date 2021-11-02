export class AirPortDTO {
  public id: number | undefined;
  public name: string | undefined;
  public terminal1: number | undefined;
  public terminal2: string | undefined;
  public terminal3: number | undefined;
  public terminal4: number | undefined;
  public terminal5: number | undefined;
  public active : number |undefined;
  public on_created: string | undefined;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
/**
 * Airport Name:	
*Terminal1:	
*Terminal2:	
*Terminal3:	
*Terminal4:	
*Terminal5:	
*Terminal6:	
*Terminal7:	
*Terminal8:	
*Terminal9:	
*Terminal10:	
Active:	
 */