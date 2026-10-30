# Deployment Guide

## Triển khai lên Vercel từ GitHub Repository

### 1. Chuẩn bị
- Repository GitHub: `https://github.com/FIRaci/XO`
- Tài khoản Vercel: `https://vercel.com/firacis-projects`

### 2. Các bước triển khai
1. Mở trang Vercel New Project: `https://vercel.com/new`.
2. Trong phần **Import Git Repository**, chọn repo `FIRaci/XO`.
3. Cấu hình dự án:
   - **Project Name**: `welcometoxo` (hoặc tùy chọn).
   - **Framework Preset**: `Other`.
   - **Root Directory**: `./`.
   - **Build and Output Settings**: Để trống (Static site không cần build step).
4. Nhấn **Deploy**.
5. Vercel sẽ tự động cấp một tên miền `*.vercel.app` với chứng chỉ SSL HTTPS miễn phí.

### 3. Cập nhật mã nguồn
- Mỗi khi đẩy commit mới lên nhánh `main`, Vercel sẽ tự động kích hoạt tính năng Continuous Deployment và cập nhật web tức thì.
