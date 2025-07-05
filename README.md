# websiteLeFoin_demo_gg

## Giới thiệu

**websiteLeFoin_demo_gg** là một website thương mại điện tử/blog được xây dựng với Next.js, Prisma, và nhiều công nghệ hiện đại khác. Dự án hỗ trợ các chức năng như: đăng nhập, đăng ký, quản lý bài viết, bình luận, đánh giá sản phẩm, giỏ hàng, và nhiều tính năng khác.

---

## 1. Cài đặt & Khởi động dự án

### 1.1. Clone repository

```bash
git clone https://github.com/luunhuttan/websiteLeFoin_demo_gg.git
cd websiteLeFoin_demo_gg
```

### 1.2. Cài đặt dependencies

```bash
npm install
```

### 1.3. Thiết lập biến môi trường

Tạo file `.env` (có thể tham khảo `.env.example` nếu có) và điền các thông tin cấu hình cần thiết, ví dụ:

```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

### 1.4. Chạy migration & seed dữ liệu (nếu có)

```bash
npx prisma migrate deploy
# hoặc
npx prisma db push

# Nếu có script seed:
npm run seed
```

### 1.5. Khởi động server

```bash
npm run dev
```

Truy cập website tại: [http://localhost:3000](http://localhost:3000)

---

## 2. Các chức năng chính trên web

### 2.1. Đăng ký & Đăng nhập

- Người dùng có thể đăng ký tài khoản mới hoặc đăng nhập bằng email và mật khẩu.
- Hỗ trợ xác thực phiên với NextAuth.

### 2.2. Quản lý bài viết (Articles)

- Xem danh sách bài viết, chi tiết bài viết.
- Chỉ admin mới có quyền tạo, chỉnh sửa, xóa bài viết (nếu có giao diện admin).

### 2.3. Bình luận bài viết (Comments)

- Người dùng có thể bình luận dưới mỗi bài viết.
- Admin có thể duyệt (approve) tất cả bình luận tại trang quản trị:  
  `http://localhost:3000/admin/comments`
- API duyệt tất cả bình luận:  
  `PATCH /api/admin/comments/approve-all`

### 2.4. Sản phẩm & Đánh giá (Products & Reviews)

- Xem danh sách sản phẩm, chi tiết sản phẩm.
- Người dùng có thể đánh giá sản phẩm (review).
- Admin có thể quản lý các đánh giá tại trang:  
  `http://localhost:3000/admin/reviews`

### 2.5. Giỏ hàng (Cart)

- Thêm/xóa sản phẩm vào giỏ hàng.
- Thanh toán (nếu có tích hợp).

### 2.6. Quản lý người dùng

- Xem và cập nhật thông tin cá nhân.
- Đổi mật khẩu, cập nhật avatar.

### 2.7. Đăng ký nhận tin (Newsletter)

- Người dùng có thể đăng ký nhận bản tin qua email.

---

## 3. Cấu trúc thư mục

```
src/
  app/                # Các route và trang Next.js
  components/         # Các component dùng lại
  lib/                # Thư viện, helper, prisma client
  messages/           # Đa ngôn ngữ
  pages/api/          # API route cho NextAuth
prisma/               # Schema và migration của Prisma
public/               # Ảnh, file tĩnh
```

---

## 4. Một số lệnh hữu ích

- **Chạy migration:**  
  `npx prisma migrate dev`
- **Truy cập Prisma Studio:**  
  `npx prisma studio`
- **Build production:**  
  `npm run build`
- **Start production:**  
  `npm start`

---

## 5. Đóng góp

1. Fork repo, tạo branch mới từ `main`.
2. Commit code, tạo pull request.
3. Mô tả rõ ràng chức năng hoặc bugfix bạn đã làm.

---

## 6. Liên hệ

- Email: [your-email@example.com]
- Facebook: [link]
- Zalo: [số điện thoại]

---

