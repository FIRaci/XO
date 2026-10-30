/**
 * App Controller - Kết nối GameEngine, ColorManager và Giao diện người dùng
 */
document.addEventListener('DOMContentLoaded', () => {
  const colorManager = new ColorManager();
  const engine = new GameEngine(3);

  // DOM Elements
  const boardEl = document.getElementById('board');
  const turnDisplay = document.getElementById('current-player-display');
  const scoreXEl = document.getElementById('score-x');
  const scoreOEl = document.getElementById('score-o');
  const scoreDrawEl = document.getElementById('score-draw');
  const winRuleHint = document.getElementById('win-rule-hint');
  const customSizeInput = document.getElementById('custom-size-input');
  const btnApplySize = document.getElementById('btn-apply-size');
  const btnReset = document.getElementById('btn-reset');
  const btnResetScores = document.getElementById('btn-reset-scores');
  const presetButtons = document.querySelectorAll('.btn-preset');

  // Easter Egg Elements
  const easterModal = document.getElementById('easter-egg-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnDismissModal = document.getElementById('btn-dismiss-modal');

  function renderBoard() {
    boardEl.innerHTML = '';
    boardEl.style.gridTemplateColumns = `repeat(${engine.size}, 1fr)`;

    // Tính kích thước ô cờ linh hoạt theo kích thước N
    let cellSize = 80;
    if (engine.size === 4) cellSize = 68;
    else if (engine.size === 5) cellSize = 56;
    else if (engine.size > 5) cellSize = Math.max(34, Math.floor(380 / engine.size));
    document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);

    for (let r = 0; r < engine.size; r++) {
      for (let c = 0; c < engine.size; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.setAttribute('role', 'button');
        cell.setAttribute('tabindex', '0');
        cell.addEventListener('click', () => handleCellClick(r, c, cell));
        boardEl.appendChild(cell);
      }
    }

    updateStatus();
    winRuleHint.textContent = `Luật thắng: ${engine.winTarget} ô liên tiếp`;
  }

  function handleCellClick(row, col, cellEl) {
    if (engine.isGameOver || cellEl.textContent !== '') return;

    const currentPlayer = engine.currentPlayer;
    const moveResult = engine.makeMove(row, col);
    if (!moveResult) return;

    cellEl.textContent = currentPlayer;
    cellEl.style.color = colorManager.getColor(currentPlayer);

    if (moveResult.status === 'win') {
      highlightWinningCells(moveResult.winningCells);
      turnDisplay.textContent = `${moveResult.winner} THẮNG!`;
      turnDisplay.style.color = colorManager.getColor(moveResult.winner);
    } else if (moveResult.status === 'draw') {
      turnDisplay.textContent = 'HÒA!';
      turnDisplay.style.color = '#000000';
    } else {
      updateStatus();
    }
    updateScores();
  }

  function highlightWinningCells(cells) {
    cells.forEach(({ row, col }) => {
      const cellEl = boardEl.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      if (cellEl) cellEl.classList.add('winning');
    });
  }

  function updateStatus() {
    turnDisplay.textContent = engine.currentPlayer;
    turnDisplay.style.color = colorManager.getColor(engine.currentPlayer);
  }

  function updateScores() {
    scoreXEl.textContent = engine.scores.X;
    scoreOEl.textContent = engine.scores.O;
    scoreDrawEl.textContent = engine.scores.draw;
  }

  function startNewGame(newSize = null) {
    if (newSize !== null) engine.setSize(newSize);
    engine.reset();
    renderBoard();
  }

  // Khi màu sắc thay đổi, cập nhật lại các quân cờ đang có trên bàn
  colorManager.setOnChange((colors) => {
    boardEl.querySelectorAll('.cell').forEach((cell) => {
      if (cell.textContent === 'X') cell.style.color = colors.X;
      else if (cell.textContent === 'O') cell.style.color = colors.O;
    });
    if (!engine.isGameOver) updateStatus();
  });

  // Sự kiện chọn kích thước nhanh
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const size = parseInt(btn.dataset.size, 10);
      customSizeInput.value = '';
      startNewGame(size);
    });
  });

  // Sự kiện tự nhập kích thước N
  btnApplySize.addEventListener('click', () => {
    const val = parseInt(customSizeInput.value, 10);
    if (isNaN(val) || val < 3 || val > 15) {
      alert('Vui lòng nhập kích thước từ 3 đến 15.');
      return;
    }
    presetButtons.forEach((b) => b.classList.remove('active'));
    startNewGame(val);
  });

  // Nút Chơi lại và Đặt lại tỉ số
  btnReset.addEventListener('click', () => startNewGame());
  btnResetScores.addEventListener('click', () => {
    engine.resetScores();
    updateScores();
    startNewGame();
  });

  // Easter Egg: Phím tắt Alt + A
  function toggleEasterEgg(show) {
    easterModal.classList.toggle('hidden', !show);
  }

  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'a' || e.key === 'A' || e.code === 'KeyA')) {
      e.preventDefault();
      toggleEasterEgg(true);
    } else if (e.key === 'Escape' && !easterModal.classList.contains('hidden')) {
      toggleEasterEgg(false);
    }
  });

  btnCloseModal.addEventListener('click', () => toggleEasterEgg(false));
  btnDismissModal.addEventListener('click', () => toggleEasterEgg(false));
  easterModal.addEventListener('click', (e) => {
    if (e.target === easterModal) toggleEasterEgg(false);
  });

  // Khởi động bàn cờ lần đầu
  renderBoard();
});
