# Project Overview & Product Definition (PDR)

## 1. Executive Summary
- **Product Name**: XO Minimalist (Web Tic-Tac-Toe & Caro)
- **Repo**: https://github.com/FIRaci/XO
- **Target Platform**: Web Browsers (Desktop & Mobile), hosted on Vercel (`firacis-projects`)
- **Core Technology**: Vanilla HTML5, CSS3, JavaScript ES6+ (Zero external dependencies)

## 2. Target Audience & Core Values
- Người dùng tìm kiếm một trò chơi giải trí cổ điển với trải nghiệm thị giác sạch sẽ, hiện đại.
- Không có quảng cáo rác, thời gian tải trang < 50ms, giao diện monochrome cao cấp.

## 3. Key Specifications
- **Grid Range**: 3x3 đến 15x15 (Presets: 3x3, 4x4, 5x5 + Custom input).
- **Win Conditions**:
  - $N \le 4$: $N$ markers liên tiếp.
  - $N \ge 5$: 5 markers liên tiếp (Caro/Gomoku rule).
- **Color Differentiation**:
  - Người chơi chọn màu riêng cho X và O.
  - Euclidean RGB distance filter (< 35) ngăn chặn việc chọn 2 màu trùng hoặc quá giống nhau.
- **Easter Egg**:
  - Lắng nghe sự kiện `Alt + A` toàn cục để mở modal quote: *"Hát ét rờ là một tựa game peak pít"*.

