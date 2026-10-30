# Code Standards

## 1. Modularization (< 200 LOC per file)
- Mọi file code trong dự án đều phải tuân thủ nghiêm ngặt giới hạn dưới 200 dòng.
- Khi logic mở rộng, tách thành các file chuyên biệt theo trách nhiệm duy nhất (Single Responsibility Principle).

## 2. Naming Conventions
- Biến & Hàm: `camelCase` (ví dụ: `handleCellClick`, `checkWin`, `colorManager`).
- Class: `PascalCase` (ví dụ: `GameEngine`, `ColorManager`).
- File: `kebab-case` (ví dụ: `game-engine.js`, `color-manager.js`).
- CSS Classes: `kebab-case` theo ngữ nghĩa (ví dụ: `btn-preset`, `board-container`, `winning`).

## 3. Performance & Clean Code
- Không sử dụng thư viện cồng kềnh (No JQuery, No heavy framework).
- Tối ưu DOM manipulation: Render bàn cờ một lần và cập nhật nội dung ô khi click.
- Đảm bảo khả năng truy cập (Accessibility: `aria-label`, `role="button"`, `role="grid"`).

