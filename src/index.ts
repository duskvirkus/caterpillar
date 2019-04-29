import { GraphicsTerminal, TerminalConfig, CharacterSet } from 'terminaltxt';
import { Leaf } from './Leaf';

if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init, false);
}

let term: GraphicsTerminal;
let leaf: Leaf;

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
  border();
  newLeaf();
  term.update();
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