import { Vec2 } from "./Vec2";
import { GraphicsTerminal } from "terminaltxt";
import { Direction } from "./Direction";
import { Leaf } from "./Leaf";

export class Caterpillar {

  public body: Vec2[] = []; // 0 is the tail, end is the head
  public erase: Vec2[] = [];
  public direction: Direction;
  public length: number;
  public dead: boolean = false;
  public fill: number;

  constructor(start: Vec2, fill: number) {
    this.body.push(start);
    this.body.push(Vec2.copy(this.body[0]));
    this.body[0].add(0, 1);
    
    this.direction = Direction.NORTH;
    this.length = 2;
    this.fill = fill;

    this.goNorth = this.goNorth.bind(this);
    this.goEast = this.goEast.bind(this);
    this.goSouth = this.goSouth.bind(this);
    this.goWest = this.goWest.bind(this);

    this.grow = this.grow.bind(this);
  }

  public show(term: GraphicsTerminal) {
    for (let i: number = 0; i < this.body.length; i++) {
      term.setCell(this.fill, this.body[i].x, this.body[i].y);
    }
    for (let i: number = 0; i < this.erase.length; i++) {
      term.setCell(0, this.erase[i].x, this.erase[i].y);
    }
    this.erase = [];
  }

  public move() {
    let head = Vec2.copy(this.body[this.body.length - 1]);
    switch(this.direction) {
      case Direction.NORTH:
        head.add(0, -1);
        break;
      case Direction.EAST:
        head.add(1, 0);
        break;
      case Direction.SOUTH:
        head.add(0, 1);
        break;
      case Direction.WEST:
        head.add(-1, 0);
        break;
    }
    this.body.push(head);
    while(this.body.length > this.length) {
      this.erase.push(this.body.shift());
    }
  }

  public grow() {
    this.length++;
  }

  public goNorth(): void {
    if (this.direction !== Direction.SOUTH) {
      this.direction = Direction.NORTH;
    }
  }

  public goEast(): void {
    if (this.direction !== Direction.WEST) {
      this.direction = Direction.EAST;
    }
  }

  public goSouth(): void {
    if (this.direction !== Direction.NORTH) {
      this.direction = Direction.SOUTH;
    }
  }

  public goWest(): void {
    if (this.direction !== Direction.EAST) {
      this.direction = Direction.WEST;
    }
  }

  public checkGrow(leaf: Leaf, newLeaf: Function) {
    if (leaf.pos.x === this.body[this.body.length - 1].x
      && leaf.pos.y === this.body[this.body.length - 1].y) {
      this.grow();
      newLeaf();
    }
  }

  public checkEdges(term: GraphicsTerminal) {
    const head: Vec2 = this.body[this.body.length - 1];
    if (head.x <= 0 || head.x >= term.getWidth() - 1 || head.y <= 0 || head.y >= term.getHeight() - 1) {
      this.dead = true;
    }
  }

}