import { GraphicsTerminal, TerminalConfig, CharacterSet, InputTracker, KeyEventType, KeyAction, OutputTerminal } from 'terminaltxt';
import { Leaf } from './Leaf';
import { Caterpillar } from './Caterpillar';
import { Vec2 } from './Vec2';
import { map } from './Map';

if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init, false);
}

const WIDTH: number = 80;
const HEIGHT: number = 25;
let title: OutputTerminal;
let term: GraphicsTerminal;
let caterpillar: Caterpillar;
let leaf: Leaf;
let input: InputTracker;

function init() {
  input = new InputTracker();
  titleSequence();
}

function titleSequence(): void {
  title = new OutputTerminal(
    {
      container: document.getElementById('output-container'),
      width: WIDTH,
      height: HEIGHT,
    } as TerminalConfig
  );
  title.write(fitToWidth('Caterpillar', WIDTH));
  title.writeln('by Fi Graham');
  title.newLine();
  title.writeln('Caterpillar is a clone of the classic snake game. It was created using ');
  title.writeln('TerminalTXT a typescript library. Please enjoy!');
  title.newLine();
  title.writeln('Use the arrow keys on your keyboard to move. Press \'Space\' to restart the game.');
  title.writeln('Press \'Enter\' to begin.');
  input.addAction({
    keys: ['Enter'],
    keyEventType: KeyEventType.KEYUP,
    action: beginGame,
  } as KeyAction);
}

function beginGame(): void {
  deleteOutput();
  term = new GraphicsTerminal(
    {
      container: document.getElementById('game-container'), 
      width: 80, 
      height: 23
    } as TerminalConfig, 
    new CharacterSet(' ○●║═╔╗╚╝'),
  );
  newGame();
  loop(120);
}

function newGame(): void {
  clearTerminal();
  newCaterpillar();
  newLeaf(caterpillar);
  border();
  term.update();
  userControls();
}

function clearTerminal(): void {
  for (let x: number = 0; x < WIDTH; x++) {
    for (let y: number = 0; y < HEIGHT; y++) {
      term.setCell(0, x, y);
    }
  }
}

function border() {
  for (let col: number = 1; col < term.getWidth() - 1; col++) {
    term.setCell(4, col, 0);
    term.setCell(4, col, term.getHeight() - 1);
  }
  for (let row: number = 1; row < term.getHeight() - 1; row++) {
    term.setCell(3, 0, row);
    term.setCell(3, term.getWidth() - 1, row);
  }
  term.setCell(5, 0, 0);
  term.setCell(6, term.getWidth() - 1, 0);
  term.setCell(7, 0, term.getHeight() - 1);
  term.setCell(8, term.getWidth() - 1, term.getHeight() - 1);
}

function newCaterpillar(): void {
  caterpillar = new Caterpillar(new Vec2(Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2)), 1);
  caterpillar.show(term);
}

function newLeaf(caterpillar: Caterpillar): void {
  let overlapping: boolean = false;
  do {
    leaf = new Leaf(1, term.getWidth() - 2, 1, term.getHeight() - 2);
    for (let i: number = 0; i < caterpillar.body.length; i++) {
      if (leaf.pos.x === caterpillar.body[i].x && leaf.pos.y === caterpillar.body[i].y) {
        overlapping = true;
        break;
      }
    }
  } while(overlapping);
  term.setCell(2, leaf.pos.x, leaf.pos.y);
}

function deleteOutput(): void {
  const outputDiv: HTMLElement = document.getElementById('termtxt-container');
  outputDiv.parentElement.removeChild(outputDiv);
}

function userControls(): void {

  input = new InputTracker();

  input.addAction({
    keys: ['ArrowUp'],
    keyEventType: KeyEventType.KEYDOWN,
    action: caterpillar.goNorth,
  } as KeyAction);

  input.addAction({
    keys: ['ArrowRight'],
    keyEventType: KeyEventType.KEYDOWN,
    action: caterpillar.goEast,
  } as KeyAction);

  input.addAction({
    keys: ['ArrowDown'],
    keyEventType: KeyEventType.KEYDOWN,
    action: caterpillar.goSouth,
  } as KeyAction);

  input.addAction({
    keys: ['ArrowLeft'],
    keyEventType: KeyEventType.KEYDOWN,
    action: caterpillar.goWest,
  } as KeyAction);
  
  input.addAction({
    keys: [' '],
    keyEventType: KeyEventType.KEYUP,
    action: newGame,
  } as KeyAction);

}

function loop(speed: number): void {
  setTimeout(() => {
    if (!caterpillar.dead) {
      caterpillar.move();
      caterpillar.show(term);
      caterpillar.checkGrow(leaf, newLeaf);
      caterpillar.checkEdges(term);
    }
    if (!caterpillar.dead) {
      term.update();
    }
    loop(map(caterpillar.length, 2, 10, 120, 60));
  }, speed);
}

function fitToWidth(text: string, width: number, fillChar: string = ' '): string {
  let fillArray: string[] = [];
  for (let i: number = 0; i < width - text.length; i++) {
    fillArray.push(fillChar);
  }
  let fill: string = fillArray.join('');
  return text + fill;
}