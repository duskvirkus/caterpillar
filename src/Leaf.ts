import { Vec2 } from './Vec2';

export class Leaf {

  public pos: Vec2;

  constructor(xMin: number, xMax: number, yMin: number, yMax: number) {
    this.pos = new Vec2(
      Math.round(Math.random() * (xMax - xMin) + xMin),
      Math.round(Math.random() * (yMax - yMin) + yMin)
    );
  }

}