import React from 'react';

export default function NewArticlePage() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h1>Thêm bài viết mới</h1>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="title">Tiêu đề</label>
          <input id="title" name="title" type="text" required style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="content">Nội dung</label>
          <textarea id="content" name="content" rows={6} required style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </div>
        <button type="submit" style={{ padding: '8px 24px', background: '#d48b4c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Thêm bài viết
        </button>
      </form>
    </div>
  );
} 