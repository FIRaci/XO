# X O // Minimalist Web Game

Trò chơi Cờ X O & Caro được thiết kế theo phong cách tối giản thanh lịch, bàn cờ lớn chiếm gần trọn khung hình với công nghệ thuần HTML5, CSS3 và Vanilla JavaScript.

## 🌟 Trải nghiệm Người dùng Mới

1. **Bàn cờ chiếm gần trọn màn hình**:
   - Thiết kế cân đối ở trung tâm (`board-frame`), kích thước cố định diện tích lớn.
   - Khi chuyển đổi kích thước từ 3×3 đến 15×15, các ô tự động thu nhỏ lại để vừa khít trong cùng một diện tích chuẩn.
   - Các góc bo tròn mềm mại (`border-radius`), hiệu ứng hover và phản hồi xúc giác nhẹ nhàng.

2. **Giao diện tinh giản tuyệt đối**:
   - Tiêu đề gọn gàng: **X O**.
   - Bảng tỉ số đặt ngay dưới tên trang: `X: 0 | Hòa: 0 | O: 0`.
   - Toàn bộ tùy chỉnh kích thước, màu sắc được ẩn gọn vào **Sidebar Cài đặt** (mặc định ẩn, mở bằng nút ⚙ trên góc phải).

3. **Tùy chỉnh màu sắc & Chống trùng màu**:
   - Tự do chọn bảng màu cho X và O trong Sidebar.
   - Tự động cảnh báo và từ chối nếu hai màu trùng hoặc quá giống nhau.

4. **Luật chơi thông minh**:
   - $N \le 4$: Cần $N$ ô liên tiếp để thắng.
   - $N \ge 5$: Cần 5 ô liên tiếp theo luật Caro chuẩn.

5. **Easter Egg**:
   - Nhấn <kbd>Alt</kbd> + <kbd>A</kbd> để hiển thị câu nói bất ngờ: *"Hát ét rờ là một tựa game peak pít"*.
