# Hướng dẫn Backup & Phục hồi Code với Git

## 1. Backup code (Lưu lại toàn bộ code hiện tại)

Khi bạn muốn lưu lại trạng thái code trước khi thực hiện thay đổi lớn, hãy tạo một commit backup:

```sh
git add .
git commit -m "Backup all current code before i18n changes"
```

## 2. Kiểm tra commit backup

Xem lịch sử commit để xác nhận đã backup thành công:

```sh
git log --oneline
```

Bạn sẽ thấy commit mới nhất với nội dung:
```
Backup all current code before i18n changes
```

## 3. Phục hồi lại code backup

Nếu sau này bạn muốn quay lại trạng thái đã backup, hãy dùng một trong các cách sau:

### a. Quay lại commit backup gần nhất

```sh
git reset --hard HEAD
```

### b. Quay lại đúng commit backup (nếu đã có thêm commit mới)

1. Xem mã commit backup:
   ```sh
   git log --oneline
   ```
2. Quay lại commit đó:
   ```sh
   git checkout <commit_id>
   ```
   (Thay `<commit_id>` bằng mã commit của backup)

## 4. Lưu ý
- Tất cả lịch sử backup nằm trong thư mục `.git` của dự án.
- Nếu bạn xóa thư mục `.git`, bạn sẽ mất toàn bộ lịch sử backup.
- Nếu muốn backup ra nơi khác, hãy copy toàn bộ thư mục dự án hoặc push lên GitHub/GitLab.

---
**File này được tạo tự động để hướng dẫn backup/phục hồi code cho dự án Next.js báo chí.** 