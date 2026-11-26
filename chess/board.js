// Chessboard: starting position and rendering. No move logic.
// Loaded as a classic script in the browser; also requireable from Node for tests.
(function (root) {
  var FILES = 'abcdefgh';
  var BACK_RANK = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  // Solid glyphs for both sides; color is applied with CSS.
  var GLYPHS = { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' };

  function initialPosition() {
    var pos = {};
    for (var i = 0; i < 8; i++) {
      var f = FILES[i];
      pos[f + '1'] = { color: 'white', type: BACK_RANK[i] };
      pos[f + '2'] = { color: 'white', type: 'pawn' };
      pos[f + '7'] = { color: 'black', type: 'pawn' };
      pos[f + '8'] = { color: 'black', type: BACK_RANK[i] };
    }
    return pos;
  }

  // a1 is dark.
  function squareColor(square) {
    var file = FILES.indexOf(square[0]);
    var rank = Number(square[1]);
    return (file + rank) % 2 === 1 ? 'dark' : 'light';
  }

  function renderBoard(container, doc) {
    doc = doc || container.ownerDocument;
    var pos = initialPosition();
    container.textContent = '';
    for (var rank = 8; rank >= 1; rank--) {
      for (var i = 0; i < 8; i++) {
        var sq = FILES[i] + rank;
        var el = doc.createElement('div');
        el.className = 'square ' + squareColor(sq);
        el.setAttribute('data-square', sq);
        var label = sq;
        var p = pos[sq];
        if (p) {
          var span = doc.createElement('span');
          span.className = 'piece ' + p.color;
          span.setAttribute('data-piece', p.color + '-' + p.type);
          span.textContent = GLYPHS[p.type];
          el.appendChild(span);
          label += ' ' + p.color + ' ' + p.type;
        }
        el.setAttribute('aria-label', label);
        if (i === 0) el.appendChild(coord(doc, 'rank-label', String(rank)));
        if (rank === 1) el.appendChild(coord(doc, 'file-label', FILES[i]));
        container.appendChild(el);
      }
    }
  }

  function coord(doc, cls, text) {
    var s = doc.createElement('span');
    s.className = 'coord ' + cls;
    s.setAttribute('aria-hidden', 'true');
    s.textContent = text;
    return s;
  }

  var api = { FILES: FILES, GLYPHS: GLYPHS, initialPosition: initialPosition, squareColor: squareColor, renderBoard: renderBoard };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Chess = api;
})(this);
