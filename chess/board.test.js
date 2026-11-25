const test = require('node:test');
const assert = require('node:assert');
const { initialPosition, squareColor, renderBoard } = require('./board.js');

const EXPECTED = {
  a1: 'rook', b1: 'knight', c1: 'bishop', d1: 'queen', e1: 'king', f1: 'bishop', g1: 'knight', h1: 'rook',
};

test('32 pieces, 16 per side', () => {
  const pos = Object.values(initialPosition());
  assert.strictEqual(pos.length, 32);
  assert.strictEqual(pos.filter(p => p.color === 'white').length, 16);
  assert.strictEqual(pos.filter(p => p.color === 'black').length, 16);
});

test('standard starting squares', () => {
  const pos = initialPosition();
  for (const [sq, type] of Object.entries(EXPECTED)) {
    assert.deepStrictEqual(pos[sq], { color: 'white', type });
    assert.deepStrictEqual(pos[sq[0] + '8'], { color: 'black', type });
    assert.deepStrictEqual(pos[sq[0] + '2'], { color: 'white', type: 'pawn' });
    assert.deepStrictEqual(pos[sq[0] + '7'], { color: 'black', type: 'pawn' });
  }
});

test('alternating colors, a1 dark, h1 light', () => {
  assert.strictEqual(squareColor('a1'), 'dark');
  assert.strictEqual(squareColor('h1'), 'light');
  assert.strictEqual(squareColor('a8'), 'light');
  assert.strictEqual(squareColor('b1'), 'light');
});

// Minimal fake DOM for renderBoard.
function fakeDoc() {
  const make = (tag) => ({ tag, children: [], attrs: {}, className: '', textContent: '',
    setAttribute(k, v) { this.attrs[k] = v; }, appendChild(c) { this.children.push(c); } });
  return { createElement: make };
}

test('renderBoard: 64 squares, rank 8 first, data-square set', () => {
  const doc = fakeDoc();
  const board = doc.createElement('div');
  renderBoard(board, doc);
  assert.strictEqual(board.children.length, 64);
  assert.strictEqual(board.children[0].attrs['data-square'], 'a8');
  assert.strictEqual(board.children[63].attrs['data-square'], 'h1');
  const e1 = board.children.find(s => s.attrs['data-square'] === 'e1');
  assert.strictEqual(e1.attrs['aria-label'], 'e1 white king');
  const pieces = board.children.flatMap(s => s.children).filter(c => c.className.startsWith('piece'));
  assert.strictEqual(pieces.length, 32);
});
