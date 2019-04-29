import { Vec2 } from './Vec2';

export class Leaf {

  public pos: Vec2;
  
  public xMin: number;
  public xMax: number;
  public yMin: number;
  public yMax: number;

  constructor(xMin: number, xMax: number, yMin: number, yMax: number) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;

    this.reset();
  }

  public reset(): void {
    this.pos = new Vec2(
      Math.round(Math.random() * (this.xMax - this.xMin) + this.xMin),
      Math.round(Math.random() * (this.yMax - this.yMin) + this.yMin)
    );
  }

}