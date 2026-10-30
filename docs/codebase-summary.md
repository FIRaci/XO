# Codebase Summary

## Thư mục & Tệp tin
- `index.html`: Cấu trúc tài liệu ngữ nghĩa, bao gồm Header, Bảng điều khiển (kích thước, màu sắc), Khu vực bàn cờ, Modal Easter Egg.
- `style.css`: Quy định hệ thống biến màu sắc monochrome, layout responsive 2 cột / 1 cột, hiệu ứng hover và animation chiến thắng.
- `js/color-manager.js`: Quản lý lưu trữ màu của X và O, thuật toán so sánh khoảng cách màu Euclidean RGB để tránh trùng lặp.
- `js/game-engine.js`: Xử lý mảng ma trận bàn cờ, cơ chế đổi lượt X/O, kiểm tra 4 hướng thắng (ngang, dọc, 2 đường chéo) theo luật Tic-Tac-Toe & Caro.
- `js/app.js`: Tầng Controller gắn kết sự kiện DOM, render bàn cờ động theo kích thước, lắng nghe phím tắt `Alt + A`.
- `vercel.json`: Tệp cấu hình định tuyến tĩnh cho Vercel.
