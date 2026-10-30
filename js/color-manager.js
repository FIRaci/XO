/**
 * Quản lý màu sắc cho quân X và O
 * Đảm bảo 2 màu luôn khác biệt và cập nhật giao diện
 */
class ColorManager {
  constructor(defaultX = '#111111', defaultO = '#888888') {
    this.colors = {
      X: defaultX,
      O: defaultO
    };
    this.colorInputX = document.getElementById('color-x');
    this.colorInputO = document.getElementById('color-o');
    this.hexLabelX = document.getElementById('hex-x');
    this.hexLabelO = document.getElementById('hex-o');
    this.errorMsg = document.getElementById('color-error-msg');
    this.onChangeCallback = null;
    this.init();
  }

  init() {
    this.syncInputs();
    this.colorInputX.addEventListener('input', (e) => this.handleColorChange('X', e.target.value));
    this.colorInputO.addEventListener('input', (e) => this.handleColorChange('O', e.target.value));
  }

  setOnChange(callback) {
    this.onChangeCallback = callback;
  }

  syncInputs() {
    this.colorInputX.value = this.colors.X;
    this.colorInputO.value = this.colors.O;
    this.hexLabelX.textContent = this.colors.X.toUpperCase();
    this.hexLabelO.textContent = this.colors.O.toUpperCase();
  }

  handleColorChange(player, newHex) {
    const otherPlayer = player === 'X' ? 'O' : 'X';
    const otherHex = this.colors[otherPlayer];

    if (this.areColorsTooClose(newHex, otherHex)) {
      this.errorMsg.classList.remove('hidden');
      this.syncInputs(); // Trả lại màu cũ
      return;
    }

    this.errorMsg.classList.add('hidden');
    this.colors[player] = newHex;
    this.syncInputs();

    if (typeof this.onChangeCallback === 'function') {
      this.onChangeCallback(this.colors);
    }
  }

  areColorsTooClose(hex1, hex2) {
    if (hex1.toLowerCase() === hex2.toLowerCase()) return true;
    const rgb1 = this.hexToRgb(hex1);
    const rgb2 = this.hexToRgb(hex2);
    if (!rgb1 || !rgb2) return true;
    // Tính khoảng cách Euclidean giữa 2 màu RGB
    const distance = Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    );
    return distance < 35; // Nếu quá gần nhau thì từ chối
  }

  hexToRgb(hex) {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return null;
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16)
    };
  }

  getColor(player) {
    return this.colors[player] || '#000000';
  }
}

window.ColorManager = ColorManager;
