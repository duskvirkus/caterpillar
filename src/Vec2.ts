export class Vec2 {

  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public static copy(vec: Vec2): Vec2 {
    return new Vec2(vec.x, vec.y);
  }

  public add(other: Vec2): void
  public add(x: number, y: number): void
  public add(xOrOther: number | Vec2, y?: number): void {
    if (typeof xOrOther === 'number') {
      this.x += xOrOther;
      this.y += y;
    } else {
      this.x += xOrOther.x;
      this.y += xOrOther.y;
    }
  }

}