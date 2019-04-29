import { GraphicsTerminal, TerminalConfig, CharacterSet, InputTracker, KeyEventType, KeyAction } from 'terminaltxt';
import { Leaf } from './Leaf';
import { Caterpillar } from './Caterpillar';
import { Vec2 } from './Vec2';

if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init, false);
}

let term: GraphicsTerminal;
let caterpillar: Caterpillar;
let leaf: Leaf;
let input: InputTracker;

function init() {
  const charSet: CharacterSet = new CharacterSet(' OL█');
  term = new GraphicsTerminal(
    {
      container: document.getElementById('container'), 
      width: 120, 
      height: 40
    } as TerminalConfig, 
    charSet
  );
  caterpillar = new Caterpillar(new Vec2(Math.floor(term.getWidth() / 2), Math.floor(term.getHeight() / 2)));
  caterpillar.show(term);
  setupInput();
  border();
  newLeaf();
  term.update();
  loop();
}

function setupInput(): void {
  input = new InputTracker();

  input.addAction({
    keys: ['ArrowUp'],
    keyEventType: KeyEventType.KEYUP,
    action: caterpillar.goNorth,
  } as KeyAction);

  input.addAction({
    keys: ['ArrowRight'],
    keyEventType: KeyEventType.KEYUP,
    action: caterpillar.goEast,
  } as KeyAction);

  input.addAction({
    keys: ['ArrowDown'],
    keyEventType: KeyEventType.KEYUP,
    action: caterpillar.goSouth,
  } as KeyAction);

  input.addAction({
    keys: ['ArrowLeft'],
    keyEventType: KeyEventType.KEYUP,
    action: caterpillar.goWest,
  } as KeyAction);

}

function loop(): void {
  setTimeout(() => {
    caterpillar.move();
    caterpillar.show(term);
    term.update();
    loop();
  }, 100);
}

function border() {
  for (let col: number = 0; col < term.getWidth(); col++) {
    term.setCell(3, col, 0);
    term.setCell(3, col, term.getHeight() - 1);
  }
  for (let row: number = 0; row < term.getHeight(); row++) {
    term.setCell(3, 0, row);
    term.setCell(3, term.getWidth() - 1, row);
  }
}

function newLeaf() {
  leaf = new Leaf(1, term.getWidth() - 2, 1, term.getHeight() - 2);
  term.setCell(2, leaf.pos.x, leaf.pos.y);
}