"use client";
export default function Error({ error }: { error: Error }) {
  return (
    <html>
      <body style={{ padding: 48, fontFamily: 'Montserrat, sans-serif', background: '#fffbe6', color: '#2a7ae4' }}>
        <h2>Đã có lỗi xảy ra!</h2>
        <pre style={{ color: '#d32f2f', background: '#fff', padding: 16, borderRadius: 8, marginTop: 24 }}>{error.message}</pre>
        <p>Vui lòng thử lại hoặc liên hệ quản trị viên nếu lỗi vẫn tiếp diễn.</p>
      </body>
    </html>
  );
} 