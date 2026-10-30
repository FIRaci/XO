# XO Minimalist // Tic-Tac-Toe & Caro

Trò chơi Cờ X/O & Caro được thiết kế theo phong cách tối giản trắng đen (monochrome minimalist) với công nghệ thuần HTML5, CSS3 và Vanilla JavaScript.

## 🌟 Tính năng chính

1. **Lối chơi linh hoạt (3x3 đến 15x15)**:
   - Các kích thước định sẵn: 3×3, 4×4, 5×5.
   - Hỗ trợ nhập kích thước tùy ý từ 3 đến 15.
   - **Luật thắng thông minh**:
     - Với bàn cờ $N \le 4$: Cần $N$ ô liên tiếp để chiến thắng (Tic-Tac-Toe chuẩn).
     - Với bàn cờ $N \ge 5$: Cần 5 ô liên tiếp theo hàng ngang, dọc hoặc chéo (luật Caro / Gomoku chuẩn).

2. **Tùy chỉnh màu sắc quân cờ (X & O)**:
   - Hỗ trợ bảng chọn màu trực quan cho từng người chơi.
   - Cơ chế phát hiện và **ngăn chặn trùng màu** (hoặc quá gần màu nhau).

3. **Giao diện Minimalist Trắng Đen**:
   - Thiết kế tinh giản, sắc sảo, độ tương phản cao.
   - Responsive hoàn hảo trên máy tính và thiết bị di động.
   - Hiệu ứng animation nhấp nháy làm nổi bật chuỗi ô chiến thắng.

4. **Easter Egg bí mật**:
   - Nhấn tổ hợp phím `Alt` + `A` trên bàn phím để mở thông điệp đặc biệt: *"Hát ét rờ là một tựa game peak pít"*.

---

## 🚀 Hướng dẫn Triển khai (Deployment)

### Triển khai lên Vercel
1. Truy cập [Vercel Dashboard](https://vercel.com/firacis-projects).
2. Chọn **Add New Project** → **Import Git Repository**.
3. Chọn repo `FIRaci/XO` (nhánh `main`).
4. Giữ nguyên cấu hình mặc định (Root Directory: `./`, Framework: `Other`).
5. Bấm **Deploy**. Trang web sẽ được triển khai trực tiếp trong vài giây.

---

## 🛠️ Cấu trúc thư mục

```
project/
├── index.html              # Giao diện chính
├── style.css               # Phong cách tối giản trắng đen (< 100 LOC)
├── js/
│   ├── color-manager.js    # Quản lý & kiểm tra hợp lệ màu sắc (< 90 LOC)
│   ├── game-engine.js      # Bộ não xử lý luật chơi & thắng cuộc (< 100 LOC)
│   └── app.js              # Controller giao diện & sự kiện (< 170 LOC)
├── vercel.json             # Cấu hình Vercel Static Hosting
├── README.md               # Tài liệu tổng quan
└── docs/                   # Tài liệu chi tiết hệ thống
```
