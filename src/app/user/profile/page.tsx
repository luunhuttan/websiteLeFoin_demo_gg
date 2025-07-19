"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Force dynamic rendering to prevent build-time URL construction issues
export const dynamic = 'force-dynamic';

export default function UserProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // State cho form sửa thông tin
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // State cho form đổi mật khẩu
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  // State cho avatar
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarMsg, setAvatarMsg] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/login");
    } else if (session.user.role === "admin") {
      router.replace("/admin");
    } else {
      setFirstName(session.user.firstName || "");
      setLastName(session.user.lastName || "");
      setAvatar((session.user as any).avatar || null);
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role === "admin") {
    return <div>Đang tải...</div>;
  }

  const { email, role } = session.user;

  // Xử lý cập nhật thông tin cá nhân
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg("");
    const res = await fetch("/api/user/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    });
    const data = await res.json();
    setProfileLoading(false);
    setProfileMsg(data.message || (res.ok ? "Cập nhật thành công" : "Có lỗi xảy ra"));
    if (res.ok) update();
  };

  // Xử lý đổi mật khẩu
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg("");
    if (newPassword !== confirmPassword) {
      setPwMsg("Mật khẩu mới không khớp!");
      return;
    }
    setPwLoading(true);
    const res = await fetch("/api/user/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    setPwLoading(false);
    setPwMsg(data.message || (res.ok ? "Đổi mật khẩu thành công" : "Có lỗi xảy ra"));
    if (res.ok) {
      setOldPassword(""); setNewPassword(""); setConfirmPassword("");
    }
  };

  // Xử lý upload avatar
  const handleUploadAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    setAvatarMsg("");
    setAvatarLoading(true);
    const input = (e.target as HTMLFormElement).elements.namedItem("avatar") as HTMLInputElement;
    if (!input?.files?.[0]) {
      setAvatarMsg("Vui lòng chọn ảnh!");
      setAvatarLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("avatar", input.files[0]);
    const res = await fetch("/api/user/upload-avatar", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setAvatarLoading(false);
    setAvatarMsg(data.message || (res.ok ? "Upload thành công" : "Có lỗi xảy ra"));
    if (res.ok && data.avatar) {
      setAvatar(data.avatar);
      update();
      window.location.href = window.location.href;
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee" }}>
      <h2>Thông tin cá nhân</h2>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <img
          src={avatar || "/images/1751360257771-Cam_banner_Le_Foin_logo.png"}
          alt="avatar"
          style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover", border: "2px solid #eee", margin: "0 auto" }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/1751360257771-Cam_banner_Le_Foin_logo.png";
          }}
        />
        <form onSubmit={handleUploadAvatar} style={{ marginTop: 8 }}>
          <input type="file" name="avatar" accept="image/*" className="mb-2" />
          <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded" disabled={avatarLoading}>{avatarLoading ? "Đang tải..." : "Đổi ảnh đại diện"}</button>
        </form>
        {avatarMsg && <div style={{ marginTop: 4, color: avatarMsg.includes("thành công") ? "green" : "red" }}>{avatarMsg}</div>}
      </div>
      <p><b>Email:</b> {email}</p>
      <p><b>Vai trò:</b> {role}</p>
      <form onSubmit={handleUpdateProfile} style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Họ:</label>
          <input value={lastName} onChange={e => setLastName(e.target.value)} className="border rounded px-2 py-1 w-full" required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Tên:</label>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} className="border rounded px-2 py-1 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={profileLoading}>{profileLoading ? "Đang lưu..." : "Lưu thông tin"}</button>
        {profileMsg && <div style={{ marginTop: 8, color: profileMsg.includes("thành công") ? "green" : "red" }}>{profileMsg}</div>}
      </form>
      <hr style={{ margin: "32px 0" }} />
      
      {/* Section tính năng user */}
      <h3 style={{ marginBottom: "16px", color: "#7A5C42" }}>Tính năng</h3>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "12px", 
        marginBottom: "24px" 
      }}>
        <button
          onClick={() => router.push('/user/favorites')}
          style={{
            background: '#E5873E',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#d17a36';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#E5873E';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Bài viết yêu thích
        </button>
        
        <button
          onClick={() => router.push('/user/history')}
          style={{
            background: '#48664E',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center'
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#3d523e';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#48664E';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Lịch sử xem
        </button>
      </div>
      
      <h3>Đổi mật khẩu</h3>
      <form onSubmit={handleChangePassword}>
        <div style={{ marginBottom: 12 }}>
          <label>Mật khẩu cũ:</label>
          <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="border rounded px-2 py-1 w-full" required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Mật khẩu mới:</label>
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="border rounded px-2 py-1 w-full" required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Nhập lại mật khẩu mới:</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="border rounded px-2 py-1 w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={pwLoading}>{pwLoading ? "Đang đổi..." : "Đổi mật khẩu"}</button>
        {pwMsg && <div style={{ marginTop: 8, color: pwMsg.includes("thành công") ? "green" : "red" }}>{pwMsg}</div>}
      </form>
    </div>
  );
} 