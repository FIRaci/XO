/**
 * App Controller - Quản lý Giao diện, Sidebar Cài đặt, Bàn cờ Full Màn hình
 */
document.addEventListener('DOMContentLoaded', () => {
  const colorManager = new ColorManager('#0a0a0a', '#777777');
  const engine = new GameEngine(3);

  // DOM Elements
  const boardEl = document.getElementById('board');
  const boardFrame = document.getElementById('board-frame');
  const scoreXEl = document.getElementById('score-x');
  const scoreOEl = document.getElementById('score-o');
  const scoreDrawEl = document.getElementById('score-draw');
  const gameToast = document.getElementById('game-toast');
  const winRuleHint = document.getElementById('win-rule-hint');

  // Sidebar & Controls
  const sidebar = document.getElementById('settings-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const btnQuickReset = document.getElementById('btn-quick-reset');
  const btnResetGame = document.getElementById('btn-reset-game');
  const btnResetScores = document.getElementById('btn-reset-scores');
  const presetButtons = document.querySelectorAll('.btn-pill');
  const customSizeInput = document.getElementById('custom-size-input');
  const btnApplySize = document.getElementById('btn-apply-size');

  // Easter Egg Elements
  const easterModal = document.getElementById('easter-egg-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnDismissModal = document.getElementById('btn-dismiss-modal');

  function renderBoard() {
    boardEl.innerHTML = '';
    boardEl.style.gridTemplateColumns = `repeat(${engine.size}, 1fr)`;
    boardEl.style.gridTemplateRows = `repeat(${engine.size}, 1fr)`;

    const frameSize = boardFrame.clientWidth || 450;
    const cellFontSize = Math.max(12, Math.floor((frameSize / engine.size) * 0.58));
    const cellRadius = Math.max(4, Math.floor(36 / engine.size));
    boardEl.style.gap = `${engine.size > 8 ? 3 : 6}px`;
    gameToast.classList.remove('show');

    for (let r = 0; r < engine.size; r++) {
      for (let c = 0; c < engine.size; c++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.style.fontSize = `${cellFontSize}px`;
        cell.style.borderRadius = `${cellRadius}px`;
        cell.style.animationDelay = `${(r + c) * 0.015}s`;
        cell.setAttribute('role', 'button');
        cell.addEventListener('click', () => handleCellClick(r, c, cell));
        boardEl.appendChild(cell);
      }
    }
    winRuleHint.textContent = `Luật thắng: ${engine.winTarget} ô liên tiếp`;
  }

  function handleCellClick(row, col, cellEl) {
    if (engine.isGameOver || cellEl.textContent !== '') return;

    const currentPlayer = engine.currentPlayer;
    const moveResult = engine.makeMove(row, col);
    if (!moveResult) return;

    const mark = document.createElement('span');
    mark.className = 'mark';
    mark.textContent = currentPlayer;
    mark.style.color = colorManager.getColor(currentPlayer);
    cellEl.appendChild(mark);

    if (moveResult.status === 'win') {
      moveResult.winningCells.forEach(({ row: r, col: c }) => {
        const winEl = boardEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
        if (winEl) winEl.classList.add('winning');
      });
      showToast(`Quân ${moveResult.winner} chiến thắng!`);
    } else if (moveResult.status === 'draw') {
      showToast('Trận đấu hòa!');
    }
    updateScores();
  }

  function showToast(msg) {
    gameToast.textContent = msg;
    gameToast.classList.add('show');
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

  function toggleSidebar(open) {
    sidebar.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
  }

  btnOpenSettings.addEventListener('click', () => toggleSidebar(true));
  btnCloseSettings.addEventListener('click', () => toggleSidebar(false));
  backdrop.addEventListener('click', () => toggleSidebar(false));

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      customSizeInput.value = '';
      startNewGame(parseInt(btn.dataset.size, 10));
      toggleSidebar(false);
    });
  });

  btnApplySize.addEventListener('click', () => {
    const val = parseInt(customSizeInput.value, 10);
    if (isNaN(val) || val < 3 || val > 15) {
      alert('Vui lòng nhập kích thước từ 3 đến 15.');
      return;
    }
    presetButtons.forEach((b) => b.classList.remove('active'));
    startNewGame(val);
    toggleSidebar(false);
  });

  btnQuickReset.addEventListener('click', () => startNewGame());
  btnResetGame.addEventListener('click', () => { startNewGame(); toggleSidebar(false); });
  btnResetScores.addEventListener('click', () => {
    engine.resetScores();
    updateScores();
    startNewGame();
    toggleSidebar(false);
  });

  colorManager.setOnChange((colors) => {
    boardEl.querySelectorAll('.cell .mark').forEach((mark) => {
      if (mark.textContent === 'X') mark.style.color = colors.X;
      else if (mark.textContent === 'O') mark.style.color = colors.O;
    });
  });

  function toggleEasterEgg(show) {
    easterModal.classList.toggle('open', show);
  }

  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'a' || e.key === 'A' || e.code === 'KeyA')) {
      e.preventDefault();
      toggleEasterEgg(true);
    } else if (e.key === 'Escape') {
      toggleEasterEgg(false);
      toggleSidebar(false);
    }
  });

  btnCloseModal.addEventListener('click', () => toggleEasterEgg(false));
  btnDismissModal.addEventListener('click', () => toggleEasterEgg(false));
  easterModal.addEventListener('click', (e) => {
    if (e.target === easterModal) toggleEasterEgg(false);
  });

  window.addEventListener('resize', () => {
    const frameSize = boardFrame.clientWidth || 450;
    const cellFontSize = Math.max(12, Math.floor((frameSize / engine.size) * 0.58));
    boardEl.querySelectorAll('.cell').forEach((cell) => {
      cell.style.fontSize = `${cellFontSize}px`;
    });
  });

  renderBoard();
});
