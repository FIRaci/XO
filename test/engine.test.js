const assert = require('assert');

// Mock window environment for testing
global.window = {};

// Load game engine and color manager
const fs = require('fs');
const path = require('path');

const gameEngineCode = fs.readFileSync(path.join(__dirname, '../js/game-engine.js'), 'utf-8');
const colorManagerCode = fs.readFileSync(path.join(__dirname, '../js/color-manager.js'), 'utf-8');

// Evaluate in local context
eval(gameEngineCode);
const GameEngine = window.GameEngine;

console.log('--- BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG ---');

// Test 1: Bàn cờ 3x3 kiểm tra thắng hàng ngang
{
  const engine = new GameEngine(3);
  assert.strictEqual(engine.size, 3);
  assert.strictEqual(engine.winTarget, 3);

  // X đi (0,0), O đi (1,0)
  engine.makeMove(0, 0);
  engine.makeMove(1, 0);
  // X đi (0,1), O đi (1,1)
  engine.makeMove(0, 1);
  engine.makeMove(1, 1);
  // X đi (0,2) -> X thắng hàng ngang 0
  const result = engine.makeMove(0, 2);
  assert.strictEqual(result.status, 'win');
  assert.strictEqual(result.winner, 'X');
  assert.strictEqual(engine.scores.X, 1);
  console.log('✓ Test 1: 3x3 thắng hàng ngang thành công');
}

// Test 2: Bàn cờ 4x4 cần 4 ô thắng
{
  const engine = new GameEngine(4);
  assert.strictEqual(engine.size, 4);
  assert.strictEqual(engine.winTarget, 4);

  // X đi đường chéo chính: (0,0), (1,1), (2,2), (3,3)
  engine.makeMove(0, 0); // X
  engine.makeMove(0, 1); // O
  engine.makeMove(1, 1); // X
  engine.makeMove(0, 2); // O
  engine.makeMove(2, 2); // X
  engine.makeMove(0, 3); // O
  const result = engine.makeMove(3, 3); // X
  assert.strictEqual(result.status, 'win');
  assert.strictEqual(result.winner, 'X');
  console.log('✓ Test 2: 4x4 thắng đường chéo chính thành công');
}

// Test 3: Bàn cờ 6x6 cần 5 ô thắng (luật Caro)
{
  const engine = new GameEngine(6);
  assert.strictEqual(engine.size, 6);
  assert.strictEqual(engine.winTarget, 5);

  for (let i = 0; i < 4; i++) {
    engine.makeMove(i, 0); // X
    engine.makeMove(i, 1); // O
  }
  const result = engine.makeMove(4, 0); // X nước thứ 5 hàng dọc 0
  assert.strictEqual(result.status, 'win');
  assert.strictEqual(result.winner, 'X');
  console.log('✓ Test 3: 6x6 thắng cột dọc 5 ô thành công');
}

// Test 4: Kiểm tra kết quả hòa (Draw) trên 3x3
{
  const engine = new GameEngine(3);
  // X O X
  // X X O
  // O X O
  const moves = [
    [0, 0], // X
    [0, 1], // O
    [0, 2], // X
    [1, 2], // O
    [1, 0], // X
    [2, 0], // O
    [1, 1], // X
    [2, 2], // O
    [2, 1]  // X
  ];
  let finalResult = null;
  moves.forEach(([r, c]) => {
    finalResult = engine.makeMove(r, c);
  });
  assert.strictEqual(finalResult.status, 'draw');
  assert.strictEqual(engine.scores.draw, 1);
  console.log('✓ Test 4: Xử lý trận hòa (Draw) thành công');
}

console.log('--- TẤT CẢ 4/4 KIỂM THỬ ĐÃ VƯỢT QUA 100% ---');
