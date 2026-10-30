/**
 * GameEngine - Quản lý trạng thái và thuật toán tính thắng cờ XO / Caro
 */
class GameEngine {
  constructor(size = 3) {
    this.setSize(size);
    this.scores = { X: 0, O: 0, draw: 0 };
    this.reset();
  }

  setSize(size) {
    this.size = Math.max(3, Math.min(15, parseInt(size, 10) || 3));
    // Luật thắng: N ô liên tiếp khi N <= 4; 5 ô liên tiếp khi N >= 5
    this.winTarget = this.size <= 4 ? this.size : 5;
  }

  reset() {
    this.board = Array.from({ length: this.size }, () => Array(this.size).fill(null));
    this.currentPlayer = 'X';
    this.isGameOver = false;
    this.winner = null;
    this.winningCells = [];
    this.moveCount = 0;
  }

  resetScores() {
    this.scores = { X: 0, O: 0, draw: 0 };
  }

  makeMove(row, col) {
    if (this.isGameOver || this.board[row][col] !== null) {
      return null;
    }

    this.board[row][col] = this.currentPlayer;
    this.moveCount++;

    const winResult = this.checkWin(row, col, this.currentPlayer);
    if (winResult) {
      this.isGameOver = true;
      this.winner = this.currentPlayer;
      this.winningCells = winResult;
      this.scores[this.winner]++;
      return { status: 'win', winner: this.winner, winningCells: this.winningCells };
    }

    if (this.moveCount === this.size * this.size) {
      this.isGameOver = true;
      this.winner = 'draw';
      this.scores.draw++;
      return { status: 'draw' };
    }

    // Đổi lượt
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    return { status: 'ongoing', nextPlayer: this.currentPlayer };
  }

  checkWin(row, col, player) {
    const directions = [
      [0, 1],   // Ngang
      [1, 0],   // Dọc
      [1, 1],   // Chéo chính (\)
      [1, -1]   // Chéo phụ (/)
    ];

    for (const [dr, dc] of directions) {
      const line = [{ row, col }];

      // Đi về hướng dương
      let r = row + dr;
      let c = col + dc;
      while (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r][c] === player) {
        line.push({ row: r, col: c });
        r += dr;
        c += dc;
      }

      // Đi về hướng âm
      r = row - dr;
      c = col - dc;
      while (r >= 0 && r < this.size && c >= 0 && c < this.size && this.board[r][c] === player) {
        line.unshift({ row: r, col: c });
        r -= dr;
        c -= dc;
      }

      if (line.length >= this.winTarget) {
        return line;
      }
    }

    return null;
  }
}

window.GameEngine = GameEngine;
