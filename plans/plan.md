# Kế hoạch Triển khai: Web XO Minimalist (Black & White)

## 1. Tổng quan & Mục tiêu
- **Mục tiêu**: Xây dựng ứng dụng web chơi cờ X O (Tic-Tac-Toe / Caro) thuần HTML, CSS, JavaScript (Vanilla).
- **Giao diện**: Phong cách trắng đen (Monochrome / High Contrast Minimalist), tinh tế, thanh lịch, cực kỳ gọn gàng.
- **Tính năng chính**:
  1. Chọn màu sắc cho quân X và O (Color Picker / Preset Swatches), có validation chặn 2 màu trùng nhau.
  2. Tùy chọn kích thước bàn cờ linh hoạt: 3x3, 4x4, hoặc tự nhập kích thước $N \times N$ ($N$ từ 3 đến 15).
  3. Logic thắng cuộc thông minh: Với $N \le 4$ cần $N$ ô liên tiếp; với $N \ge 5$ cần 5 ô liên tiếp (luật Caro/Gomoku chuẩn).
  4. Hiệu ứng hiển thị đường thẳng / ô chiến thắng, thông báo lượt đi, đếm số lượt, nút chơi lại (Reset).
  5. Phím tắt Easter Egg: Nhấn tổ hợp `Alt + A` hiển thị thông điệp đặc biệt: *"Hát ét rờ là một tựa game peak pít"*.
  6. Git & Deployment: Khởi tạo Git, cấu hình `vercel.json`, push toàn bộ lên GitHub repo `https://github.com/FIRaci/XO` và hướng dẫn kết nối Vercel `firacis-projects`.

---

## 2. Cấu trúc Dự án
```
project/
├── index.html              # Cấu trúc giao diện HTML5 ngữ nghĩa
├── style.css               # Phong cách tối giản trắng đen, responsive
├── js/
│   ├── game-engine.js      # Logic bàn cờ, kiểm tra thắng cuộc NxN & Gomoku
│   ├── color-manager.js    # Quản lý & kiểm tra hợp lệ màu sắc X & O
│   └── app.js              # Controller giao diện, phím tắt Alt+A, sự kiện DOM
├── vercel.json             # Cấu hình routing & cache cho Vercel Static Deployment
├── README.md               # Tài liệu hướng dẫn sử dụng, luật chơi, deploy
└── docs/                   # Tài liệu kỹ thuật tiêu chuẩn
    ├── project-overview-pdr.md
    ├── code-standards.md
    └── deployment-guide.md
```
*(Đảm bảo quy tắc tách module < 200 dòng code mỗi file)*.

---

## 3. Các giai đoạn thực hiện (Phases)
- **Giai đoạn 1**: Thiết kế giao diện (UI) và CSS trắng đen tối giản.
- **Giai đoạn 2**: Xây dựng Game Engine và Logic kiểm tra màu / bàn cờ tùy chỉnh.
- **Giai đoạn 3**: Tích hợp phím tắt `Alt + A` hiển thị modal / toast thông điệp.
- **Giai đoạn 4**: Kiểm thử (Testing) toàn diện logic thắng, draw, trùng màu, phím tắt.
- **Giai đoạn 5**: Khởi tạo Git repo, tạo commit chuẩn conventional commits, push lên `https://github.com/FIRaci/XO` và cấu hình Vercel.

