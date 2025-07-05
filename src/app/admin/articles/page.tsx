"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/components/LanguageProvider";

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author?: { id: number; email: string };
  tags?: Array<{ id: number; name: string }>;
  category?: string;
}

export default function AdminArticlesPage() {
  const session = useSession();
  const { t } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeLang, setActiveLang] = useState<'vi' | 'en'>('vi');
  const [formTitle, setFormTitle] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [formExcerpt, setFormExcerpt] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [formContent, setFormContent] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editActiveLang, setEditActiveLang] = useState<'vi' | 'en'>('vi');
  const [editTitle, setEditTitle] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [editExcerpt, setEditExcerpt] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [editContent, setEditContent] = useState<{ vi: string; en: string }>({ vi: '', en: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formImageUploading, setFormImageUploading] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [editImageUploading, setEditImageUploading] = useState(false);
  const [formTags, setFormTags] = useState<string[]>([]);
  const [editTags, setEditTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editTagInput, setEditTagInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>('Tất cả');
  const [searchTitle, setSearchTitle] = useState<string>('');
  const router = useRouter();

  // Kiểm tra quyền admin
  useEffect(() => {
    if (session.status === "authenticated") {
      if (session.data.user.role !== 'admin') {
        router.replace("/");
        return;
      }
      fetchArticles();
    }
  }, [session, router]);

  const fetchArticles = () => {
    setLoading(true);
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => {
        console.log('API /api/articles data:', data);
        setArticles(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải danh sách bài viết");
        setLoading(false);
      });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void, setUploading: (b: boolean) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Kiểm tra kích thước file (giới hạn 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
      return;
    }
    
    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh hợp lệ.');
      return;
    }
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      
      if (!res.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await res.json();
      setImage(data.url);
      // Thông báo upload thành công
      console.log('Upload thành công:', data.url);
    } catch (error) {
      alert('Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    // Đảm bảo tags là mảng string
    const tagsToSend = Array.isArray(formTags) ? formTags : (formTags ? [formTags] : []);
    console.log('Submit new article, tags:', tagsToSend);
    const content = JSON.stringify({
      vi: { title: formTitle.vi, excerpt: formExcerpt.vi, content: formContent.vi, image: formImage },
      en: { title: formTitle.en, excerpt: formExcerpt.en, content: formContent.en, image: formImage }
    });
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: formTitle.vi, content, tags: tagsToSend })
    });
    if (res.ok) {
      setShowForm(false);
      setFormTitle({ vi: '', en: '' });
      setFormExcerpt({ vi: '', en: '' });
      setFormContent({ vi: '', en: '' });
      setFormImage("");
      setFormTags([]);
      fetchArticles();
    } else {
      const data = await res.json();
      setFormError(data.error || "Có lỗi xảy ra");
    }
    setFormLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
    
    const res = await fetch(`/api/articles/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${JSON.stringify(session.data?.user || {})}`
      }
    });
    
    if (res.ok) {
      fetchArticles();
    } else {
      alert("Có lỗi xảy ra khi xóa bài viết");
    }
  };

  const handleEditClick = (article: Article) => {
    setEditId(article.id);
    try {
      const content = JSON.parse(article.content);
      setEditTitle({ vi: content.vi?.title || '', en: content.en?.title || '' });
      setEditExcerpt({ vi: content.vi?.excerpt || '', en: content.en?.excerpt || '' });
      setEditContent({ vi: content.vi?.content || '', en: content.en?.content || '' });
      setEditImage(content.vi?.image || '');
      if (article.tags && Array.isArray(article.tags)) {
        setEditTags(article.tags.map((tag: any) => tag.name));
      } else {
        setEditTags([]);
      }
    } catch {
      setEditTitle({ vi: '', en: '' });
      setEditExcerpt({ vi: '', en: '' });
      setEditContent({ vi: '', en: '' });
      setEditImage('');
      setEditTags([]);
    }
    setEditError("");
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    // Đảm bảo tags là mảng string
    const tagsToSend = Array.isArray(editTags) ? editTags : (editTags ? [editTags] : []);
    console.log('Submit edit article, tags:', tagsToSend);
    const content = JSON.stringify({
      vi: { title: editTitle.vi, excerpt: editExcerpt.vi, content: editContent.vi, image: editImage },
      en: { title: editTitle.en, excerpt: editExcerpt.en, content: editContent.en, image: editImage }
    });
    const res = await fetch(`/api/articles/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JSON.stringify(session.data.user)}` },
      body: JSON.stringify({ title: editTitle.vi, content, tags: tagsToSend })
    });
    if (res.ok) {
      setEditId(null);
      setEditTitle({ vi: '', en: '' });
      setEditExcerpt({ vi: '', en: '' });
      setEditContent({ vi: '', en: '' });
      setEditImage("");
      setEditTags([]);
      fetchArticles();
    } else {
      const data = await res.json();
      setEditError(data.error || "Có lỗi xảy ra");
    }
    setEditLoading(false);
  };

  useEffect(() => {
    fetch("/api/tags")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllTags(data.map((t: any) => t.name));
        } else {
          setAllTags([]); // hoặc có thể hiển thị thông báo lỗi
        }
      })
      .catch(() => setAllTags([]));
  }, [showForm, editId]);

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

  const handleEditTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',' || e.key === 'Tab') && editTagInput.trim()) {
      e.preventDefault();
      if (!editTags.includes(editTagInput.trim())) {
        setEditTags([...editTags, editTagInput.trim()]);
      }
      setEditTagInput("");
    }
  };

  const handleRemoveEditTag = (tag: string) => setEditTags(editTags.filter(t => t !== tag));

  // Lọc bài viết theo tag và tiêu đề
  const filteredArticles = articles.filter(article => {
    const matchTag = selectedTag === 'Tất cả' || article.tags?.some(t => t.name === selectedTag);
    const matchTitle = article.title.toLowerCase().includes(searchTitle.toLowerCase());
    return matchTag && matchTitle;
  });

  if (session.status === "loading") {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "50vh",
        fontSize: "18px",
        color: "#666"
      }}>
        Đang tải...
      </div>
    );
  }

  if (!session.data.user || session.data.user.role !== 'admin') {
    return (
      <div style={{ 
        textAlign: "center", 
        marginTop: 40,
        color: "red",
        fontSize: "18px"
      }}>
        Bạn không có quyền truy cập trang này.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-leaf">Quản lý bài viết</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/admin/reviews')}
            className="bg-leaf hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-colors flex items-center gap-2"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Quản lý đánh giá
          </button>
          <button
            onClick={() => router.push('/admin/comments')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-colors flex items-center gap-2"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
            Quản lý bình luận
          </button>
          <button
            onClick={() => router.push('/admin/articles/new')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-colors"
          >
            + Thêm bài viết mới
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleAddArticle} style={{ marginBottom: 32, background: '#f9f9f9', borderRadius: 8, padding: 24 }}>
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
            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, setFormImage, setFormImageUploading)} disabled={formImageUploading} />
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
                  <span style={{ marginLeft: 6, cursor: 'pointer', fontWeight: 700 }} onClick={() => setFormTags(formTags.filter(t => t !== tag))}>&times;</span>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ',' || e.key === 'Tab') && tagInput.trim()) {
                    e.preventDefault();
                    if (!formTags.includes(tagInput.trim())) {
                      setFormTags([...formTags, tagInput.trim()]);
                    }
                    setTagInput("");
                  }
                }}
                placeholder="Nhập tag, enter hoặc phẩy để thêm"
                style={{ border: 'none', outline: 'none', minWidth: 120 }}
              />
            </div>
            {/* List tag đã tồn tại */}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4, fontWeight: 500 }}>Chọn nhanh tag:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allTags.filter(tag => !formTags.includes(tag)).length === 0 ? (
                  <span style={{ color: '#bbb', fontSize: 13 }}>Không có tag nào</span>
                ) : (
                  allTags.filter(tag => !formTags.includes(tag)).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      style={{
                        background: '#f5f7fa',
                        color: '#1976d2',
                        padding: '6px 16px',
                        borderRadius: 16,
                        fontSize: 14,
                        border: '1.5px solid #e3f2fd',
                        cursor: 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.18s',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => setFormTags([...formTags, tag])}
                      onMouseOver={e => e.currentTarget.style.background = '#e3f2fd'}
                      onMouseOut={e => e.currentTarget.style.background = '#f5f7fa'}
                      title="Chọn tag này"
                    >
                      + {tag}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
          <button type="submit" disabled={formLoading} style={{ background: '#2a7ae4', color: '#fff', padding: '10px 32px', borderRadius: 6, fontWeight: 600, border: 'none', marginTop: 8 }}>
            {formLoading ? 'Đang lưu...' : 'Lưu bài viết'}
          </button>
          {formError && <div style={{ color: 'red', marginTop: 10 }}>{formError}</div>}
        </form>
      )}

      {editId !== null && (
        <form onSubmit={handleEditSubmit} style={{ 
          marginBottom: 32, 
          background: "#fff3cd", 
          padding: 24, 
          borderRadius: 12,
          border: "1px solid #ffeaa7"
        }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button type="button" onClick={() => setEditActiveLang('vi')} style={{ fontWeight: editActiveLang === 'vi' ? 700 : 400, background: editActiveLang === 'vi' ? '#2a7ae4' : '#eee', color: editActiveLang === 'vi' ? '#fff' : '#333', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer' }}>Tiếng Việt</button>
            <button type="button" onClick={() => setEditActiveLang('en')} style={{ fontWeight: editActiveLang === 'en' ? 700 : 400, background: editActiveLang === 'en' ? '#2a7ae4' : '#eee', color: editActiveLang === 'en' ? '#fff' : '#333', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer' }}>English</button>
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder={editActiveLang === 'vi' ? 'Tiêu đề (Tiếng Việt)' : 'Title (English)'}
              value={editTitle[editActiveLang]}
              onChange={e => setEditTitle({ ...editTitle, [editActiveLang]: e.target.value })}
              required
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
            />
            <input
              type="text"
              placeholder={editActiveLang === 'vi' ? 'Mô tả ngắn (Tiếng Việt)' : 'Excerpt (English)'}
              value={editExcerpt[editActiveLang]}
              onChange={e => setEditExcerpt({ ...editExcerpt, [editActiveLang]: e.target.value })}
              required
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
            />
            <textarea
              placeholder={editActiveLang === 'vi' ? 'Nội dung (Tiếng Việt)' : 'Content (English)'}
              value={editContent[editActiveLang]}
              onChange={e => setEditContent({ ...editContent, [editActiveLang]: e.target.value })}
              required
              style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', minHeight: 80 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 500, marginRight: 8 }}>Ảnh đại diện:</label>
            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, setEditImage, setEditImageUploading)} disabled={editImageUploading} />
            {editImageUploading && <span style={{ marginLeft: 8, color: '#666', fontSize: '14px' }}>Đang upload...</span>}
            {editImage && (
              <div style={{ display: 'inline-block', marginLeft: 12, position: 'relative' }}>
                <img src={editImage} alt="preview" style={{ maxHeight: 60, borderRadius: 6 }} />
                <button
                  type="button"
                  onClick={() => setEditImage("")}
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
              {editTags.map(tag => (
                <span key={tag} style={{ background: '#e3f2fd', color: '#1976d2', padding: '4px 10px', borderRadius: 12, fontSize: 13, marginRight: 4, display: 'flex', alignItems: 'center' }}>
                  {tag}
                  <span style={{ marginLeft: 6, cursor: 'pointer', fontWeight: 700 }} onClick={() => setEditTags(editTags.filter(t => t !== tag))}>&times;</span>
                </span>
              ))}
              <input
                type="text"
                value={editTagInput}
                onChange={e => setEditTagInput(e.target.value)}
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ',' || e.key === 'Tab') && editTagInput.trim()) {
                    e.preventDefault();
                    if (!editTags.includes(editTagInput.trim())) {
                      setEditTags([...editTags, editTagInput.trim()]);
                    }
                    setEditTagInput("");
                  }
                }}
                placeholder="Nhập tag, enter hoặc phẩy để thêm"
                style={{ border: 'none', outline: 'none', minWidth: 120 }}
              />
            </div>
            {/* List tag đã tồn tại */}
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4, fontWeight: 500 }}>Chọn nhanh tag:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allTags.filter(tag => !editTags.includes(tag)).length === 0 ? (
                  <span style={{ color: '#bbb', fontSize: 13 }}>Không có tag nào</span>
                ) : (
                  allTags.filter(tag => !editTags.includes(tag)).map(tag => (
                    <button
                      key={tag}
                      type="button"
                      style={{
                        background: '#f5f7fa',
                        color: '#1976d2',
                        padding: '6px 16px',
                        borderRadius: 16,
                        fontSize: 14,
                        border: '1.5px solid #e3f2fd',
                        cursor: 'pointer',
                        fontWeight: 500,
                        transition: 'all 0.18s',
                        outline: 'none',
                        boxShadow: 'none',
                      }}
                      onClick={() => setEditTags([...editTags, tag])}
                      onMouseOver={e => e.currentTarget.style.background = '#e3f2fd'}
                      onMouseOut={e => e.currentTarget.style.background = '#f5f7fa'}
                      title="Chọn tag này"
                    >
                      + {tag}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
          <button type="submit" disabled={editLoading} style={{ background: '#2a7ae4', color: '#fff', padding: '10px 32px', borderRadius: 6, fontWeight: 600, border: 'none', marginTop: 8 }}>
            {editLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
          {editError && <div style={{ color: 'red', marginTop: 10 }}>{editError}</div>}
        </form>
      )}

      {/* Thêm UI filter tag và ô tìm kiếm phía trên danh sách bài viết */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Tất cả', ...allTags].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                padding: '8px 22px',
                borderRadius: 999,
                border: '2px solid #2a7ae4',
                background: selectedTag === tag ? '#2a7ae4' : '#fff',
                color: selectedTag === tag ? '#fff' : '#2a7ae4',
                fontWeight: 600,
                fontSize: 15,
                transition: 'all 0.2s',
                cursor: 'pointer',
                outline: 'none',
                minWidth: 80
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm tiêu đề..."
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1.5px solid #bdbdbd',
            fontSize: 15,
            minWidth: 220
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#666" }}>Đang tải danh sách bài viết...</div>
      ) : error ? (
        <div style={{ color: "red", textAlign: "center", padding: 40 }}>{error}</div>
      ) : filteredArticles.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "#666" }}>Không có bài viết nào phù hợp.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px #eee' }}>
            <thead>
              <tr style={{ background: '#f5f7fa', color: '#333', fontWeight: 700 }}>
                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Tiêu đề</th>
                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Tags</th>
                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Ngày tạo</th>
                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Tác giả</th>
                <th style={{ padding: '12px 8px', textAlign: 'center' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => (
                <tr key={article.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600, color: '#2a7ae4', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</td>
                  <td style={{ padding: '10px 8px' }}>
                    {article.tags && article.tags.length > 0 ? (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {article.tags.map(tag => (
                          <span key={tag.name} style={{ background: '#e3f2fd', color: '#1976d2', padding: '3px 12px', borderRadius: 12, fontSize: 13, fontWeight: 500 }}>{tag.name}</span>
                        ))}
                      </div>
                    ) : <span style={{ color: '#aaa' }}>-</span>}
                  </td>
                  <td style={{ padding: '10px 8px', color: '#666', fontSize: 14 }}>{new Date(article.createdAt).toLocaleString('vi-VN')}</td>
                  <td style={{ padding: '10px 8px', color: '#666', fontSize: 14 }}>{article.author?.email || '-'}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEditClick(article)}
                      style={{
                        background: '#ffc107',
                        color: '#333',
                        padding: '7px 18px',
                        borderRadius: 6,
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginRight: 8
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      style={{
                        background: '#dc3545',
                        color: '#fff',
                        padding: '7px 18px',
                        borderRadius: 6,
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 