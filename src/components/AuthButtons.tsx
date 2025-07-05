"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageProvider";

export default function AuthButtons() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("lefoin_user");
      if (userStr) setUser(JSON.parse(userStr));
      else setUser(null);
    }
  }, []);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("lefoin_user");
    setUser(null);
    setMenuOpen(false);
    window.location.reload();
  };

  if (user) {
    return (
      <div style={{ position: "relative", marginLeft: 18 }}>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8 }}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {/* Avatar: chỉ là icon tròn, có thể thay bằng hình thật nếu có */}
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2a7ae4", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
            {user.email?.[0]?.toUpperCase() || "A"}
          </div>
          <span style={{ fontWeight: 600 }}>{user.email}</span>
        </div>
        {menuOpen && (
          <div ref={menuRef} style={{ position: "absolute", right: 0, top: 40, background: "#fff", border: "1px solid #eee", borderRadius: 8, boxShadow: "0 2px 8px #eee", minWidth: 180, zIndex: 10 }}>
            <div style={{ padding: 12, borderBottom: "1px solid #f5f5f5" }}>
              <div style={{ fontWeight: 700 }}>{user.email}</div>
              <div style={{ fontSize: 13, color: "#888" }}>{user.role === "admin" ? "Admin" : "Khách hàng"}</div>
            </div>
            <div style={{ padding: 12 }}>
              <button onClick={handleLogout} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", width: "100%", fontWeight: 600 }}>
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 12, marginLeft: 18 }}>
      <a
        href="/login"
        style={{
          padding: '7px 18px',
          borderRadius: 8,
          background: hovered === 'login' ? 'linear-gradient(90deg,#155fa0,#2a7ae4)' : 'linear-gradient(90deg,#2a7ae4,#4fc3f7)',
          color: '#fff',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(42,122,228,0.10)',
          transition: 'background 0.18s, transform 0.18s',
          display: 'inline-block',
          transform: hovered === 'login' ? 'scale(1.07)' : 'scale(1)',
        }}
        onMouseOver={() => setHovered('login')}
        onMouseOut={() => setHovered(null)}
      >
        {t("auth.login")}
      </a>
      <a
        href="/register"
        style={{
          padding: '7px 18px',
          borderRadius: 8,
          background: hovered === 'register' ? 'linear-gradient(90deg,#f6a340,#f6a340)' : 'linear-gradient(90deg,#f6a340,#ffb347)',
          color: '#fff',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(246,163,64,0.10)',
          transition: 'background 0.18s, transform 0.18s',
          display: 'inline-block',
          transform: hovered === 'register' ? 'scale(1.07)' : 'scale(1)',
        }}
        onMouseOver={() => setHovered('register')}
        onMouseOut={() => setHovered(null)}
      >
        {t("auth.register")}
      </a>
    </div>
  );
} 