"use client";
import React, { useState, useEffect } from "react";

export default function NewArticlePage() {
  const [activeLang, setActiveLang] = useState<'vi' | 'en'>('vi');
  const [formTitle, setFormTitle] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [formExcerpt, setFormExcerpt] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [formContent, setFormContent] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [formImage, setFormImage] = useState("");
  const [formImageUploading, setFormImageUploading] = useState(false);
  const [formTags, setFormTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    // Giả lập fetch tags từ API
    fetch("/api/tags")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllTags(data.map((t: any) => t.name));
        } else {
          setAllTags([]);
        }
      })
      .catch(() => setAllTags([]));
  }, []);

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',' || e.key === 'Tab') && tagInput.trim()) {
      e.preventDefault();
      if (!formTags.includes(tagInput.trim())) {
        setFormTags([...formTags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => setFormTags(formTags.filter(t => t !== tag));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh hợp lệ.');
      return;
    }
    setFormImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFormImage(data.url);
    } catch (error) {
      alert('Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.');
    } finally {
      setFormImageUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Thêm bài viết mới</h1>
      <form>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button type="button" onClick={() => setActiveLang('vi')} style={{ fontWeight: activeLang === 'vi' ? 700 : 400, background: activeLang === 'vi' ? '#2a7ae4' : '#eee', color: activeLang === 'vi' ? '#fff' : '#333', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer' }}>Tiếng Việt</button>
          <button type="button" onClick={() => setActiveLang('en')} style={{ fontWeight: activeLang === 'en' ? 700 : 400, background: activeLang === 'en' ? '#2a7ae4' : '#eee', color: activeLang === 'en' ? '#fff' : '#333', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer' }}>English</button>
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder={activeLang === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (English)'}
            value={formTitle[activeLang]}
            onChange={e => setFormTitle({ ...formTitle, [activeLang]: e.target.value })}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
          />
          <input
            type="text"
            placeholder={activeLang === 'vi' ? 'Mô tả ngắn (Tiếng Việt)' : 'Excerpt (English)'}
            value={formExcerpt[activeLang]}
            onChange={e => setFormExcerpt({ ...formExcerpt, [activeLang]: e.target.value })}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
          />
          <textarea
            placeholder={activeLang === 'vi' ? 'Nội dung (Tiếng Việt)' : 'Content (English)'}
            value={formContent[activeLang]}
            onChange={e => setFormContent({ ...formContent, [activeLang]: e.target.value })}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', minHeight: 80 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 500, marginRight: 8 }}>Ảnh đại diện:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={formImageUploading} />
          {formImageUploading && <span style={{ marginLeft: 8, color: '#666', fontSize: '14px' }}>Đang upload...</span>}
          {formImage && (
            <div style={{ display: 'inline-block', marginLeft: 12, position: 'relative' }}>
              <img src={formImage} alt="preview" style={{ maxHeight: 60, borderRadius: 6 }} />
              <button
                type="button"
                onClick={() => setFormImage("")}
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  background: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Xóa ảnh"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 500, marginRight: 8 }}>Tags:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
            {formTags.map(tag => (
              <span key={tag} style={{ background: '#e3f2fd', color: '#1976d2', padding: '4px 10px', borderRadius: 12, fontSize: 13, marginRight: 4, display: 'flex', alignItems: 'center' }}>
                {tag}
                <span style={{ marginLeft: 6, cursor: 'pointer', fontWeight: 700 }} onClick={() => handleRemoveTag(tag)}>&times;</span>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Nhập tag và nhấn Enter, Tab hoặc phẩy..."
              style={{ minWidth: 120, padding: 6, borderRadius: 8, border: '1px solid #bbb' }}
              list="all-tags"
            />
            <datalist id="all-tags">
              {allTags.map(tag => (
                <option key={tag} value={tag} />
              ))}
            </datalist>
          </div>
        </div>
        <button type="submit" style={{ padding: '8px 24px', background: '#d48b4c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600, fontSize: 16 }}>
          Thêm bài viết
        </button>
      </form>
    </div>
  );
} 