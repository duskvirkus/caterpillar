import { Vec2 } from "./Vec2";
import { GraphicsTerminal } from "terminaltxt";
import { Direction } from "./Direction";

export class Caterpillar {

  public start: Vec2;
  public direction: Direction;

  constructor(start: Vec2) {
    this.start = start;
    this.direction = Direction.NORTH;

    this.goNorth = this.goNorth.bind(this);
    this.goEast = this.goEast.bind(this);
    this.goSouth = this.goSouth.bind(this);
    this.goWest = this.goWest.bind(this);
  }

  public show(term: GraphicsTerminal) {
    term.setCell('O', this.start.x, this.start.y);
  }

  public move() {
    switch(this.direction) {
      case Direction.NORTH:
        this.start.add(0, -1);
        break;
      case Direction.EAST:
        this.start.add(1, 0);
        break;
      case Direction.SOUTH:
        this.start.add(0, 1);
        break;
      case Direction.WEST:
        this.start.add(-1, 0);
        break;
    }
  }

  public goNorth(): void {
    this.direction = Direction.NORTH;
  }

  public goEast(): void {
    this.direction = Direction.EAST;
  }

  public goSouth(): void {
    this.direction = Direction.SOUTH;
  }

  public goWest(): void {
    this.direction = Direction.WEST;
  }

}