# System Architecture

## 1. High-Level Diagram

```
+-----------------------------------------------------------------+
|                       DOM & UI Layer                            |
|             (index.html, style.css, app.js)                     |
+--------------------------------+--------------------------------+
                                 |
         +-----------------------+-----------------------+
         |                                               |
         v                                               v
+-----------------------+                     +-----------------------+
|     ColorManager      |                     |      GameEngine       |
| (js/color-manager.js) |                     |  (js/game-engine.js)  |
| - Validation          |                     | - Matrix State        |
| - RGB Euclidean Diff  |                     | - Turn Alternation    |
| - UI Synchronization  |                     | - Win Detection (N/5) |
+-----------------------+                     +-----------------------+
```

## 2. Event-Driven Flow
1. **User Interaction**: Người chơi click vào một ô `(row, col)` trên bàn cờ.
2. **State Validation**: `GameEngine.makeMove(row, col)` kiểm tra tính hợp lệ và cập nhật ma trận bàn cờ.
3. **Win / Draw Evaluation**:
   - Nếu đủ $K$ ô liên tiếp: Trả về trạng thái `win` kèm danh sách tọa độ chiến thắng.
   - Nếu đầy bàn cờ: Trả về `draw`.
   - Ngược lại: Chuyển lượt và trả về `ongoing`.
4. **View Update**: `app.js` gán màu từ `ColorManager.getColor(player)` cho quân cờ, hiển thị trạng thái và cập nhật bảng điểm.

