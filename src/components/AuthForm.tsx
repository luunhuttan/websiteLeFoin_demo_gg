"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import '../app/auth/auth-anim.css';
import '../app/auth/auth-slide.css';

const socialProviders = [
  { id: "google", icon: <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.23l6.9-6.9C36.2 2.6 30.5 0 24 0 14.8 0 6.7 5.8 2.7 14.1l8.1 6.3C12.7 13.7 17.9 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.7-2.1 5-4.4 6.6l7 5.4c4.1-3.8 6.5-9.4 6.5-16.4z"/><path fill="#FBBC05" d="M10.8 28.4c-1-2.7-1-5.7 0-8.4l-8.1-6.3C.6 17.1 0 20.5 0 24s.6 6.9 1.7 10.3l8.1-6.3z"/><path fill="#EA4335" d="M24 48c6.5 0 12-2.1 16-5.7l-7-5.4c-2 1.4-4.5 2.2-9 2.2-6.1 0-11.3-4.1-13.2-9.6l-8.1 6.3C6.7 42.2 14.8 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg> },
  { id: "facebook", icon: <svg width="20" height="20" viewBox="0 0 32 32"><path fill="#1877F3" d="M32 16c0-8.8-7.2-16-16-16S0 7.2 0 16c0 8 5.8 14.6 13.3 15.8v-11.2h-4V16h4v-2.7c0-4 2.4-6.2 6-6.2 1.7 0 3.5.3 3.5.3v4h-2c-2 0-2.6 1.2-2.6 2.5V16h4.4l-.7 4.6h-3.7v11.2C26.2 30.6 32 24 32 16z"/></svg> },
  { id: "github", icon: <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#333" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg> },
  { id: "linkedin", icon: <svg width="20" height="20" viewBox="0 0 32 32"><path fill="#0077B5" d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zM9.3 27.3H4.7V12h4.6v15.3zM7 10.3c-1.5 0-2.7-1.2-2.7-2.7S5.5 5 7 5s2.7 1.2 2.7 2.7-1.2 2.6-2.7 2.6zm20.3 17H22V19c0-2-.7-3.3-2.5-3.3-1.4 0-2.2.9-2.6 1.7-.1.2-.1.5-.1.8v9.1h-4.6s.1-14.7 0-16.3h4.6v2.3c.6-.9 1.7-2.3 4.1-2.3 3 0 5.2 2 5.2 6.3v9.7z"/></svg> },
];

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // State cho login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // State cho register
  const [regFirstName, setRegFirstName] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  const handleSwitch = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setLoginError("");
    setRegError("");
    setRegSuccess("");
  };

  // Xử lý login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const res = await signIn("credentials", {
      email: loginEmail,
      password: loginPassword,
      redirect: false,
    });
    setLoginLoading(false);
    if (res?.error) {
      setLoginError("Sai email hoặc mật khẩu!");
    } else {
      // Kiểm tra role để redirect
      try {
        const userRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          if (userData.role === 'admin') {
            window.location.href = "/admin/articles";
          } else {
            window.location.href = "/";
          }
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        window.location.href = "/";
      }
    }
  };

  // Xử lý register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");
    setRegSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: regFirstName,
          lastName: regLastName,
          email: regEmail,
          password: regPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRegError(data.message || "Đăng ký thất bại!");
      } else {
        setRegSuccess("Đăng ký thành công! Đang đăng nhập...");
        // Tự động đăng nhập luôn
        const loginRes = await signIn("credentials", {
          email: regEmail,
          password: regPassword,
          redirect: false,
        });
        if (loginRes?.error) {
          setRegError("Đăng ký thành công nhưng đăng nhập thất bại!");
        } else {
          window.location.href = "/";
        }
      }
    } catch (err) {
      setRegError("Có lỗi xảy ra!");
    }
    setRegLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f7fa] to-[#e3e0d9] px-2 py-8">
      <div className="relative w-full max-w-4xl h-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Panel cam luôn bên trái */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center px-8 text-white rounded-l-3xl" style={{ background: '#E5873E' }}>
          {isLogin ? (
            <>
              <h2 className="text-3xl font-bold mb-2 text-center">Hello, Welcome!</h2>
              <p className="mb-6 text-center">Don't have an account?</p>
              <button onClick={() => handleSwitch(false)} className="px-6 py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-[#E5873E] transition">Register</button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back!</h2>
              <p className="mb-6 text-center">Already have an account?</p>
              <button onClick={() => handleSwitch(true)} className="px-6 py-2 border border-white rounded-full font-semibold hover:bg-white hover:text-[#E5873E] transition">Login</button>
            </>
          )}
        </div>
        {/* Form luôn bên phải */}
        <div className="w-1/2 h-full flex flex-col justify-center px-10 rounded-r-3xl" style={{ background: '#D9E4E2' }}>
          {isLogin ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#7A5C42' }}>Login</h2>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="relative">
                  <input type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-[#E5873E] focus:ring-2 focus:ring-[#E5873E] outline-none transition" style={{ color: '#48664E' }} required />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AFCBBB' }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M2 6a4 4 0 0 1 8 0v2a4 4 0 0 1-8 0V6zm8 8a4 4 0 0 1-8 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <div className="relative">
                  <input type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-[#E5873E] focus:ring-2 focus:ring-[#E5873E] outline-none transition" style={{ color: '#48664E' }} required />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AFCBBB' }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M12 17v-1a4 4 0 1 0-8 0v1m8 0a4 4 0 1 0-8 0m8 0v1a4 4 0 1 0-8 0v-1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                {loginError && <div className="text-red-500 text-sm text-center">{loginError}</div>}
                <button type="submit" className="w-full py-2 rounded-lg font-semibold transition shadow" style={{ background: '#7A5C42', color: 'white' }} disabled={loginLoading}>{loginLoading ? 'Đang đăng nhập...' : 'Login'}</button>
              </form>
              <div className="text-center text-sm mt-4" style={{ color: '#48664E' }}>or login with social platforms</div>
              <div className="flex gap-4 justify-center mt-2">
                {socialProviders.map(p => (
                  <button key={p.id} onClick={() => signIn(p.id)} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition">
                    {p.icon}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#7A5C42' }}>Registration</h2>
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="relative">
                  <input type="text" placeholder="First Name" value={regFirstName} onChange={e => setRegFirstName(e.target.value)} className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-[#E5873E] focus:ring-2 focus:ring-[#E5873E] outline-none transition" style={{ color: '#48664E' }} required />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AFCBBB' }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M12 4a4 4 0 1 0-8 0v2a4 4 0 1 0 8 0V4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <div className="relative">
                  <input type="text" placeholder="Last Name" value={regLastName} onChange={e => setRegLastName(e.target.value)} className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-[#E5873E] focus:ring-2 focus:ring-[#E5873E] outline-none transition" style={{ color: '#48664E' }} required />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AFCBBB' }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M12 4a4 4 0 1 0-8 0v2a4 4 0 1 0 8 0V4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <div className="relative">
                  <input type="email" placeholder="Email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-[#E5873E] focus:ring-2 focus:ring-[#E5873E] outline-none transition" style={{ color: '#48664E' }} required />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AFCBBB' }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M2 6a4 4 0 0 1 8 0v2a4 4 0 0 1-8 0V6zm8 8a4 4 0 0 1-8 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                <div className="relative">
                  <input type="password" placeholder="Password" value={regPassword} onChange={e => setRegPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:border-[#E5873E] focus:ring-2 focus:ring-[#E5873E] outline-none transition" style={{ color: '#48664E' }} required />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#AFCBBB' }}>
                    <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M12 17v-1a4 4 0 1 0-8 0v1m8 0a4 4 0 1 0-8 0m8 0v1a4 4 0 1 0-8 0v-1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
                {regError && <div className="text-red-500 text-sm text-center">{regError}</div>}
                {regSuccess && <div className="text-green-600 text-sm text-center">{regSuccess}</div>}
                <button type="submit" className="w-full py-2 rounded-lg font-semibold transition shadow" style={{ background: '#7A5C42', color: 'white' }} disabled={regLoading}>{regLoading ? 'Đang đăng ký...' : 'Register'}</button>
              </form>
              <div className="text-center text-sm mt-4" style={{ color: '#48664E' }}>or register with social platforms</div>
              <div className="flex gap-4 justify-center mt-2">
                {socialProviders.map(p => (
                  <button key={p.id} onClick={() => signIn(p.id)} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition">
                    {p.icon}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 