"use client";
import Head from 'next/head';
import { useLanguage } from '@/components/LanguageProvider';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaShoppingBag } from 'react-icons/fa';

// Force dynamic rendering to prevent build-time URL construction issues
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', phone: '', message: '' });
      toast.success('Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.');
    }, 1200);
  };

  return (
    <>
      <Head>
        <title>{t("contact.title")}</title>
        <meta name="description" content={t("contact.description")} />
        {/* Open Graph */}
        <meta property="og:title" content={t("contact.title")} />
        <meta property="og:description" content={t("contact.description")} />
        <meta property="og:image" content="/images/og-lefoin.jpg" />
        <meta property="og:url" content="https://lefoin.vn/contact" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:title" content={t("contact.title")} />
        <meta name="twitter:description" content={t("contact.description")} />
        <meta name="twitter:image" content="/images/og-lefoin.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto my-12 p-8 rounded-2xl shadow-2xl bg-white dark:bg-[#23272f] border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">Liên hệ với Le Foin</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">Bạn có thắc mắc, góp ý hoặc cần hỗ trợ? Hãy gửi thông tin cho chúng tôi, Le Foin sẽ phản hồi sớm nhất!</p>
        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <div>
            <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Họ tên *</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#23272f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Nhập họ tên của bạn" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#23272f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Nhập email của bạn" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Số điện thoại</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#23272f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Nhập số điện thoại (nếu có)" />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">Nội dung *</label>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#23272f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Bạn cần hỗ trợ gì?" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-bold text-lg bg-amber-500 hover:bg-amber-600 text-white shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Đang gửi...' : 'Gửi liên hệ'}
          </button>
        </form>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FaEnvelope className="text-amber-500" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">Email: <a href="mailto:contact@lefoin.vn" className="underline hover:text-amber-600">contact@lefoin.vn</a></span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <FaPhone className="text-green-600" />
            <span className="text-gray-800 dark:text-gray-200 font-medium">Hotline: <a href="tel:0123456789" className="underline hover:text-green-700">0123 456 789</a></span>
          </div>
        </div>
        <div className="flex gap-4 mt-2">
          <a href="#" target="_blank" rel="noopener" className="text-2xl text-blue-600 hover:text-blue-800"><FaFacebook /></a>
          <a href="#" target="_blank" rel="noopener" className="text-2xl text-pink-500 hover:text-pink-700"><FaInstagram /></a>
          <a href="#" target="_blank" rel="noopener" className="text-2xl text-orange-500 hover:text-orange-700"><FaShoppingBag /></a>
        </div>
      </div>
    </>
  );
} 